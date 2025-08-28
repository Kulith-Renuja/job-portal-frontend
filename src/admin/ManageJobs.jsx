import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import {
fetchJobs,
createJob,
deleteJob,
updateJob,
} from '../services/jobService';
import { fetchCompanies } from '../services/companyService';
import { uploadImage } from '../services/uploadService';
import './ManageJobs.css';

export default function ManageJobs() {
const { user, isAdmin } = useAuth();
const adminId = user?._id;

const [jobs, setJobs] = useState([]);
const [companies, setCompanies] = useState([]);
const [loading, setLoading] = useState(false);

const [searchTerm, setSearchTerm] = useState('');
const [activeTab, setActiveTab] = useState('all'); // 'admin' | 'company' | 'all'
const [expandedCompanyId, setExpandedCompanyId] = useState(null);

const [form, setForm] = useState({
title: '',
place: '',
company: '', // company name (display)
category: '',
jobType: '',
salary: '',
deadline: '',
content: '',
image: '',
requiredEducationLevel: '',
requiredFieldOfStudy: '',
minGraduationYear: '',
// Admin-only fields
applicationEmail: '',
companyId: '', // for jobs posted by admin, this should be adminId
});

const [editId, setEditId] = useState(null);

useEffect(() => {
loadJobs();
loadCompanies();
}, []);

useEffect(() => {
// Prefill companyId for admin
if (isAdmin && adminId && !form.companyId) {
setForm((prev) => ({ ...prev, companyId: adminId }));
}
}, [isAdmin, adminId]); // eslint-disable-line

const loadJobs = async () => {
setLoading(true);
try {
const res = await fetchJobs();
const sorted = (res.data || []).sort(
(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);
setJobs(sorted);
} catch (err) {
console.error('Failed to load jobs', err);
} finally {
setLoading(false);
}
};

const loadCompanies = async () => {
try {
const res = await fetchCompanies();
setCompanies(res.data || []);
} catch (err) {
console.error('Failed to load companies', err);
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

  const jobData = {
    ...form,
    image: imageUrl,
    // map "company" form field to what backend will save as display name
    companyName: form.company || '',
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
    company: '',
    category: '',
    jobType: '',
    salary: '',
    deadline: '',
    content: '',
    image: '',
    requiredEducationLevel: '',
    requiredFieldOfStudy: '',
    minGraduationYear: '',
    applicationEmail: '',
    companyId: isAdmin ? adminId : '',
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
setJobs((prev) => prev.filter((job) => job._id !== id));
} catch (err) {
console.error('Failed to delete job', err);
}
};

const handleEdit = (job) => {
setEditId(job._id);
setForm({
title: job.title || '',
place: job.place || '',
company: job.companyName || job.company || '',
category: job.category || '',
jobType: job.jobType || '',
salary: job.salary || '',
deadline: job.deadline ? job.deadline.split('T')[0] : '',
content: job.content || '',
image: job.image || '',
requiredEducationLevel: job.requiredEducationLevel || '',
requiredFieldOfStudy: job.requiredFieldOfStudy || '',
minGraduationYear: job.minGraduationYear || '',
applicationEmail: job.applicationEmail || '',
companyId: job.companyId || (isAdmin ? adminId : ''),
});
};

const filteredJobs = useMemo(() => {
const s = searchTerm.trim().toLowerCase();
const bySearch = (job) => {
if (!s) return true;
return (
(job.title || '').toLowerCase().includes(s) ||
(job.place || '').toLowerCase().includes(s) ||
(job.category || '').toLowerCase().includes(s) ||
(job.companyName || job.company || '').toLowerCase().includes(s)
);
};
return jobs.filter(bySearch);
}, [jobs, searchTerm]);

// Tabs data
const adminJobs = useMemo(() => {
if (!adminId) return [];
return filteredJobs.filter((j) => (j.companyId || '').toString() === adminId);
}, [filteredJobs, adminId]);

const groupedCompanyJobs = useMemo(() => {
// Group all jobs by companyId, excluding admin’s jobs
const map = new Map();
filteredJobs
.filter((j) => (j.companyId || '').toString() !== (adminId || ''))
.forEach((j) => {
const key = (j.companyId || 'unknown').toString();
if (!map.has(key)) map.set(key, []);
map.get(key).push(j);
});
// Sort each group by date desc
for (const [k, arr] of map.entries()) {
arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
map.set(k, arr);
}
return map;
}, [filteredJobs, adminId]);

const allJobs = filteredJobs;

const companyDisplayName = (companyId, jobsInGroup) => {
const found = companies.find((c) => c._id === companyId);
if (found?.companyName) return found.companyName;
// fallback from job
return jobsInGroup?.[0]?.companyName || 'Company';
};

return (
<div className="manage-jobs">
<h1 className="manage-title">Manage Jobs</h1>
{/* Job form */}
  <form onSubmit={handleSubmit} className="job-form">
    <h2>{editId ? 'Edit Job' : 'Add New Job'}</h2>

    <input type="text" name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
    <input type="text" name="place" placeholder="Location" value={form.place} onChange={handleChange} />
    <input type="text" name="company" placeholder="Company Name (display)" value={form.company} onChange={handleChange} />

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

    {/* Admin-only additional fields */}
    {isAdmin && (
      <>
        <h3>Admin-only fields</h3>
        <input
          type="email"
          name="applicationEmail"
          placeholder="Company Email to receive applications"
          value={form.applicationEmail}
          onChange={handleChange}
        />
        <input
          type="text"
          name="companyId"
          placeholder="Company ID (for admin posts, use admin ID)"
          value={form.companyId}
          onChange={handleChange}
          readOnly // you can remove readOnly if you want to override
        />
        <small>Note: Admin can post without company registration. Applications will be sent to the email above.</small>
      </>
    )}

    <button type="submit" disabled={loading}>
      {editId ? 'Update Job' : 'Add Job'}
    </button>
    {editId && (
      <button
        type="button"
        onClick={() => {
          setEditId(null);
          setForm({
            title: '',
            place: '',
            company: '',
            category: '',
            jobType: '',
            salary: '',
            deadline: '',
            content: '',
            image: '',
            requiredEducationLevel: '',
            requiredFieldOfStudy: '',
            minGraduationYear: '',
            applicationEmail: '',
            companyId: isAdmin ? adminId : '',
          });
        }}
      >
        Cancel
      </button>
    )}
  </form>

  {/* Toolbar */}
  <h1 className="manage-title">Jobs</h1>
  <div className="job-toolbar">
    <input
      type="text"
      className="search-input"
      placeholder="Search by title, company, location or category"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <div className="tabs">
      <button className={`tab ${activeTab === 'admin' ? 'active' : ''}`} onClick={() => setActiveTab('admin')}>
        Admin Jobs
      </button>
      <button className={`tab ${activeTab === 'company' ? 'active' : ''}`} onClick={() => setActiveTab('company')}>
        Company Jobs
      </button>
      <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
        All Jobs
      </button>
    </div>
  </div>

  {/* Lists */}
  <div className="job-list">
    {activeTab === 'admin' && (
      <>
        {adminJobs.length === 0 ? (
          <p>No admin jobs found.</p>
        ) : (
          adminJobs.map((job) => (
            <div key={job._id} className="job-row">
              <span>{job.title} — {job.companyName || '—'} — {job.place || '—'}</span>
              <div className="job-actions">
                <button onClick={() => handleEdit(job)}>Edit</button>
                <button onClick={() => handleDelete(job._id)} className="delete">Delete</button>
              </div>
            </div>
          ))
        )}
      </>
    )}

    {activeTab === 'company' && (
      <>
        {[...groupedCompanyJobs.entries()].map(([cid, list]) => (
          <div key={cid} className="company-group">
            <div className="company-group-header" onClick={() => setExpandedCompanyId((cur) => (cur === cid ? null : cid))}>
              <strong>{companyDisplayName(cid, list)}</strong>
              <span> ({list.length} job{list.length > 1 ? 's' : ''})</span>
              <button className="secondary" style={{ marginLeft: '1rem' }}>
                {expandedCompanyId === cid ? 'Hide' : 'View'}
              </button>
            </div>
            {expandedCompanyId === cid && (
              <div className="company-group-list">
                {list.map((job) => (
                  <div key={job._id} className="job-row">
                    <span>{job.title} — {job.place || '—'}</span>
                    <div className="job-actions">
                      <button onClick={() => handleEdit(job)}>Edit</button>
                      <button onClick={() => handleDelete(job._id)} className="delete">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {groupedCompanyJobs.size === 0 && <p>No company jobs found.</p>}
      </>
    )}

    {activeTab === 'all' && (
      <>
        {allJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          allJobs.map((job) => (
            <div key={job._id} className="job-row">
              <span>{job.title} — {job.companyName || '—'} — {job.place || '—'}</span>
              <div className="job-actions">
                <button onClick={() => handleEdit(job)}>Edit</button>
                <button onClick={() => handleDelete(job._id)} className="delete">Delete</button>
              </div>
            </div>
          ))
        )}
      </>
    )}
  </div>
</div>
);
}