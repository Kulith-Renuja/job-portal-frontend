import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createJob, deleteJob } from '../services/jobService';
import { fetchCompanyJobs, canCompanyPost } from '../services/companyService';
import { uploadImage } from '../services/uploadService';
import './CompanyDashboard.css';

export default function CompanyDashboard() {
const { user, companyId, isCompanyApproved } = useAuth();
const id = companyId || user?._id;

const [jobs, setJobs] = useState([]);
const [loading, setLoading] = useState(false);

// Quota/state from backend
const [quotaLoading, setQuotaLoading] = useState(false);
const [freePostsRemaining, setFreePostsRemaining] = useState(null);
const [canPost, setCanPost] = useState(null);
const [quotaMsg, setQuotaMsg] = useState('');

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

// Load jobs and quota on mount
useEffect(() => {
if (!id) return;
loadJobs();
loadQuota();
}, [id]);

const loadJobs = async () => {
setLoading(true);
try {
const res = await fetchCompanyJobs(id);
const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
setJobs(sorted);
} catch (err) {
console.error('Failed to load jobs', err);
} finally {
setLoading(false);
}
};

const loadQuota = async () => {
setQuotaLoading(true);
try {
const res = await canCompanyPost(id);
setCanPost(!!res.data?.canPost);
// freePostsRemaining is returned by backend (after monthly reset if needed)
setFreePostsRemaining(
typeof res.data?.freePostsRemaining === 'number' ? res.data.freePostsRemaining : null
);
setQuotaMsg(res.data?.message || '');
} catch (err) {
// e.g. 403 when not approved
setCanPost(false);
setQuotaMsg(err?.response?.data?.message || 'Not eligible to post at this time');
// If backend returns freePostsRemaining in error, you can read it similarly
} finally {
setQuotaLoading(false);
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
// No client-side limit calculation. Let backend enforce and return errors.
// If you still want to pre-check, uncomment:
// if (canPost === false) return alert(quotaMsg || 'You cannot post at this time.');
setLoading(true);
try {
  let imageUrl = form.image;
  if (form.image instanceof File) {
    imageUrl = await uploadImage(form.image);
  }

  const jobData = { ...form, image: imageUrl };

  // Create only (no update)
  await createJob(jobData);

  // Refresh jobs and quota (decrement happens at server on create)
  await loadJobs();
  await loadQuota();

  // Reset form
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
} catch (err) {
  const msg = err?.response?.data?.message || 'Failed to post job';
  alert(msg);
  console.error('Failed to submit job', err);
} finally {
  setLoading(false);
}
};

const handleDelete = async (jobId) => {
if (!window.confirm('Are you sure you want to delete this job?')) return;
try {
await deleteJob(jobId);
// Remove locally; DO NOT change remaining posts (server counts only on create)
setJobs((prev) => prev.filter((j) => j._id !== jobId));
} catch (err) {
console.error('Failed to delete job', err);
}
};

return (
<div className="company-dashboard">
<h1>Company Dashboard</h1>
  {!isCompanyApproved && (
    <div className="alert alert-warning">
      Your company is not approved yet. You won’t be able to post jobs until approved.
    </div>
  )}

  {/* Stats from server */}
  <div className="dashboard-stats">
    <div className="stat-card">
      <h3>Total Jobs Posted</h3>
      <p>{jobs.length}</p>
    </div>
    <div className="stat-card">
      <h3>Free Posts Remaining (this month)</h3>
      <p>
        {quotaLoading ? 'Loading...' : freePostsRemaining !== null ? freePostsRemaining : '—'}
      </p>
    </div>
    {quotaMsg && (
      <div className="stat-card note">
        <small>{quotaMsg}</small>
      </div>
    )}
  </div>

  {/* Create job only (no edit/update) */}
  <form onSubmit={handleSubmit} className="job-form">
    <h2>Post New Job</h2>

    <input type="text" name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
    <input type="text" name="place" placeholder="Location" value={form.place} onChange={handleChange} />

    <select name="category" value={form.category} onChange={handleChange}>
      <option value="">Select Category</option>
      <option value="IT">IT</option>
      <option value="Finance">Finance</option>
      <option value="Management">Management</option>
    </select>

    <select name="jobType" value={form.jobType} onChange={handleChange}>
      <option value="">Select Job Type</option>
      <option value="Full-time">Full-time</option>
      <option value="Part-time">Part-time</option>
      <option value="Internship">Internship</option>
      <option value="Contract">Contract</option>
    </select>

    <input type="number" name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} />
    <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />

    <textarea name="content" placeholder="Job Description" value={form.content} onChange={handleChange} required />

    <input type="file" name="image" onChange={handleChange} />

    <h3>Education Requirements</h3>
    <select name="requiredEducationLevel" value={form.requiredEducationLevel} onChange={handleChange}>
      <option value="">Select Required Education Level</option>
      <option value="high-school">High School</option>
      <option value="diploma">Diploma</option>
      <option value="bachelor">Bachelor's Degree</option>
      <option value="master">Master's Degree</option>
      <option value="doctorate">Doctorate</option>
    </select>

    <input type="text" name="requiredFieldOfStudy" placeholder="Required Field of Study (optional)" value={form.requiredFieldOfStudy} onChange={handleChange} />

    <input type="number" name="minGraduationYear" placeholder="Minimum Graduation Year (optional)" value={form.minGraduationYear} onChange={handleChange} min="1900" max={new Date().getFullYear()} />

    <button type="submit" disabled={loading}>
      {loading ? 'Posting…' : 'Post Job'}
    </button>
  </form>

  <h2>My Job Postings</h2>
  {loading ? (
    <div>Loading jobs…</div>
  ) : jobs.length === 0 ? (
    <p>No jobs posted yet.</p>
  ) : (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job._id} className="job-row">
          <span>{job.title} — {job.place || '—'}</span>
          <div className="job-actions">
            {/* No edit button as requested */}
            <button onClick={() => handleDelete(job._id)} className="delete">Delete</button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
);
}