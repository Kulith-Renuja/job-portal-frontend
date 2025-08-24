import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
// Note: No change needed here, the existing services are fine.
import { fetchJobs, createJob, deleteJob, updateJob } from '../services/jobService';
import { uploadImage } from '../services/uploadService';
import { getPaymentHistory } from '../services/paymentService';
import PaymentForm from './PaymentForm';
import FilteredApplications from './FilteredApplications';
import './CompanyDashboard.css';

export default function CompanyDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [jobPostingLimit, setJobPostingLimit] = useState(3);
  const [form, setForm] = useState({
    title: '',
    place: '',
    category: '',
    jobType: '',
    salary: '',
    deadline: '',
    content: '',
    image: '',
    requiredEducationLevel: '',
    requiredFieldOfStudy: '',
    minGraduationYear: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadJobs();
    loadPaymentHistory();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    try {
      // ⭐ The backend now returns all jobs. We still need to filter on the frontend.
      // This is a temporary solution. A more efficient approach would be to have a
      // backend endpoint that returns only the jobs for the logged-in company.
      const res = await fetchJobs();
      
      // Filter jobs by company ID
      const companyJobs = res.data.filter(job => job.companyId === user._id);
      
      const sorted = companyJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setJobs(sorted);
    } catch (err) {
      console.error('Failed to load jobs', err);
    } finally {
      setLoading(false);
    }
  };

  const loadPaymentHistory = async () => {
    try {
      const res = await getPaymentHistory(user._id);
      setPaymentHistory(res.data);
    } catch (err) {
      console.error('Failed to load payment history', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if company has reached posting limit
    if (!editId && jobs.length >= jobPostingLimit) {
      setShowPaymentForm(true);
      return;
    }
    
    setLoading(true);

    try {
      let imageUrl = form.image;

      if (form.image instanceof File) {
        try {
          imageUrl = await uploadImage(form.image);
        } catch (uploadErr) {
          console.error('Image upload failed:', uploadErr);
          setLoading(false);
          return;
        }
      }

      // ⭐ The backend now automatically pulls companyId and companyName from the auth token.
      // We don't need to send these fields from the form anymore, which makes it safer.
      const jobData = { 
        ...form, 
        image: imageUrl
      };

      if (editId) {
        await updateJob(editId, jobData);
      } else {
        await createJob(jobData);
      }

      await loadJobs();
      setForm({ 
        title: '', 
        place: '', 
        category: '', 
        jobType: '', 
        salary: '', 
        deadline: '', 
        content: '', 
        image: '' 
      });
      setEditId(null);
    } catch (err) {
      console.error('Failed to submit job', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error('Failed to delete job', err);
    }
  };

  const handleEdit = (job) => {
    setEditId(job._id);
    setForm({
        title: job.title,
        place: job.place,
        category: job.category,
        jobType: job.jobType || '',
        salary: job.salary || '',
        deadline: job.deadline ? job.deadline.split('T')[0] : '',
        content: job.content,
        image: job.image,
        requiredEducationLevel: job.requiredEducationLevel || '',
        requiredFieldOfStudy: job.requiredFieldOfStudy || '',
        minGraduationYear: job.minGraduationYear || ''
    });
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    // Refresh job limit after successful payment
    setJobPostingLimit(jobPostingLimit + 3);
    // Show success message
    alert('Payment successful! You can now post more jobs.');
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
  };

  if (showPaymentForm) {
    return (
      <div className="company-dashboard">
        <h1>Job Posting Payment</h1>
        <p>You've reached your job posting limit. Please make a payment to post more jobs.</p>
        <PaymentForm 
          jobId={null} 
          amount={500} 
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      </div>
    );
  }

  return (
    <div className="company-dashboard">
      <h1>Company Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Jobs Posted</h3>
          <p>{jobs.length}</p>
        </div>
        <div className="stat-card">
          <h3>Posting Limit</h3>
          <p>{jobPostingLimit}</p>
        </div>
        <div className="stat-card">
          <h3>Remaining Posts</h3>
          <p>{Math.max(0, jobPostingLimit - jobs.length)}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="job-form">
        <h2>{editId ? 'Edit Job' : 'Post New Job'}</h2>
        <input 
          type="text" 
          name="title" 
          placeholder="Job Title" 
          value={form.title} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="place" 
          placeholder="Location" 
          value={form.place} 
          onChange={handleChange} 
        />
        
        <select 
          name="category" 
          value={form.category} 
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Management">Management</option>
        </select>

        <select 
          name="jobType" 
          value={form.jobType} 
          onChange={handleChange}
        >
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />

        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
        />

        <textarea 
          name="content" 
          placeholder="Job Description" 
          value={form.content} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="file" 
          name="image" 
          onChange={handleChange} 
        />
<h3>Education Requirements</h3>
        <select name="requiredEducationLevel" value={form.requiredEducationLevel} onChange={handleChange}>
          <option value="">Select Required Education Level</option>
          <option value="high-school">High School</option>
          <option value="diploma">Diploma</option>
          <option value="bachelor">Bachelor's Degree</option>
          <option value="master">Master's Degree</option>
          <option value="doctorate">Doctorate</option>
        </select>
        
        <input
          type="text"
          name="requiredFieldOfStudy"
          placeholder="Required Field of Study (optional)"
          value={form.requiredFieldOfStudy}
          onChange={handleChange}
        />
        
        <input
          type="number"
          name="minGraduationYear"
          placeholder="Minimum Graduation Year (optional)"
          value={form.minGraduationYear}
          onChange={handleChange}
          min="1900"
          max={new Date().getFullYear()}
        />

        {form.image && (
          <div className="image-preview">
            <img
              src={form.image instanceof File ? URL.createObjectURL(form.image) : form.image}
              alt="Preview"
              style={{ width: '150px', height: 'auto', marginTop: '10px', borderRadius: '8px' }}
            />
            <button
              type="button"
              className="remove-image"
              onClick={() => setForm((prev) => ({ ...prev, image: '' }))}
            >
              ✖ Remove
            </button>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {editId ? 'Update Job' : 'Post Job'}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({
                title: '',
                place: '',
                category: '',
                jobType: '',
                salary: '',
                deadline: '',
                content: '',
                image: '',
                requiredEducationLevel: '',
                requiredFieldOfStudy: '',
                minGraduationYear: ''
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>My Job Postings</h2>
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job._id} className="job-row">
            <span>{job.title} - {job.place}</span>
            <div className="job-actions">
              <button onClick={() => handleEdit(job)}>Edit</button>
              <button onClick={() => handleDelete(job._id)} className="delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
      
      <FilteredApplications />
    </div>
  );
}
