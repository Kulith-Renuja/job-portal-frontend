import { useEffect, useState } from 'react';
import {
  fetchJobs,
  createJob,
  deleteJob,
  updateJob,
} from '../services/jobService';
import './ManageJobs.css';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({
    title: '',
    place: '',
    company: '',
    category: '',
    content: '',
    image: '',
  });
  const [editId, setEditId] = useState(null);

  // 🔁 Fetch jobs from backend
  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        const res = await fetchJobs();
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setJobs(sorted);
      } catch (err) {
        console.error('Failed to load jobs', err);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  // 📝 Handle form change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // ➕ Add or ✏️ Edit job
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const jobData = { ...form };

      if (editId) {
        await updateJob(editId, jobData);
      } else {
        await createJob(jobData);
      }

      const res = await fetchJobs();
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setJobs(sorted);
      setForm({ title: '', place: '', company: '', category: '', content: '', image: '' });
      setEditId(null);
    } catch (err) {
      console.error('Failed to submit job', err);
    } finally {
      setLoading(false);
    }
  };

  // 🗑 Delete job
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error('Failed to delete job', err);
    }
  };

  // ✏️ Edit button
  const handleEdit = (job) => {
    setEditId(job._id);
    setForm({
      title: job.title,
      place: job.place,
      company: job.company,
      category: job.category,
      content: job.content,
      image: job.image,
    });
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-jobs">
      <h1 className="manage-title">Manage Jobs</h1>

    <form onSubmit={handleSubmit} className="job-form">
        <h2>{editId ? 'Edit Job' : 'Add New Job'}</h2>
        <input type="text" name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
        <input type="text" name="place" placeholder="Location" value={form.place} onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <textarea name="content" placeholder="Job Description" value={form.content} onChange={handleChange} required />
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit" disabled={loading}>
          {editId ? 'Update Job' : 'Add Job'}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ title: '', place: '', company: '', category: '', content: '', image: '' }) }}>Cancel</button>
        )}
      </form>

        <h1 className="manage-title">Search job</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search by title, location or category"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="job-list">
        {filteredJobs.map((job) => (
          <div key={job._id} className="job-row">
            <span>{job.title} - {job.place}</span>
            <div className="job-actions">
              <button onClick={() => handleEdit(job)}>Edit</button>
              <button onClick={() => handleDelete(job._id)} className="delete">Delete</button>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}
