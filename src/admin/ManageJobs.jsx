import { useState } from 'react';
import './ManageJobs.css';

export default function ManageJobs() {
const [searchTerm, setSearchTerm] = useState('');
const [jobs, setJobs] = useState([
{
id: 1,
title: 'Frontend Developer',
place: 'Colombo',
company: 'Tech Corp',
category: 'IT',
content: 'Develop and maintain React frontend',
image: null,
},
{
id: 2,
title: 'Marketing Executive',
place: 'Galle',
company: 'Brandly',
category: 'Marketing',
content: 'Social media campaigns and outreach',
image: null,
},
]);

const [form, setForm] = useState({
title: '',
place: '',
company: '',
category: '',
content: '',
image: null,
});

const handleChange = (e) => {
const { name, value, files } = e.target;
setForm({
...form,
[name]: files ? files[0] : value,
});
};

const handleAdd = (e) => {
e.preventDefault();
const newJob = {
...form,
id: Date.now(),
};
setJobs([...jobs, newJob]);
setForm({ title: '', place: '', company: '', category: '', content: '', image: null });
};

const handleDelete = (id) => {
setJobs(jobs.filter((j) => j.id !== id));
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
  <input
    type="text"
    className="search-input"
    placeholder="Search by title, location or category"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <div className="job-list">
    {filteredJobs.map((job) => (
      <div key={job.id} className="job-row">
        <span>{job.title}</span>
        <div className="job-actions">
          <button>Edit</button>
          <button onClick={() => handleDelete(job.id)} className="delete">Delete</button>
        </div>
      </div>
    ))}
  </div>

  <form onSubmit={handleAdd} className="job-form">
    <h2>Add New Job</h2>
    <input type="text" name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
    <input type="text" name="place" placeholder="Location" value={form.place} onChange={handleChange} required />
    <input type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
    <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
    <textarea name="content" placeholder="Job Description" value={form.content} onChange={handleChange} required />
    <input type="file" name="image" onChange={handleChange} />
    <button type="submit">Add Job</button>
  </form>
</div>
);
}