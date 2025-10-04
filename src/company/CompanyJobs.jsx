// pages/Jobs.jsx
import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { fetchJobs } from '../services/jobService';
import './CompanyJobs.css';

export default function CompanyJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchJobs();
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to load jobs:', err);
      }
    };
    load();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category ? job.category === category : true;
    const matchLocation = location
      ? job.place.toLowerCase().includes(location.toLowerCase())
      : true;

    return matchSearch && matchCategory && matchLocation;
  });

  return (
    <div className="jobs-page">
      <section className="job-filter-bar">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Management">Management</option>
          {/* Add more as needed */}
        </select>

        <input
          type="text"
          placeholder="Location (e.g., Colombo)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </section>

      <h2 className="section-title">ගොඩයන Jobs</h2>
      <div className="job-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p className="no-results">No jobs found matching your filters.</p>
        )}
      </div>
    </div>
  );
}
