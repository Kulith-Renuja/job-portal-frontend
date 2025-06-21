import { useState } from 'react';
import JobCard from '../components/JobCard';
import './Jobs.css';

export default function Jobs() {
  const allJobs = [
    {
      title: 'Frontend Developer',
      company: 'TechNova',
      location: 'Colombo, Sri Lanka',
      salary: 85000,
      category: 'IT'
    },
    {
      title: 'Finance Analyst',
      company: 'CapitalEdge',
      location: 'Kandy, Sri Lanka',
      salary: 90000,
      category: 'Finance'
    },
    {
      title: 'HR Manager',
      company: 'PeopleFirst',
      location: 'Remote',
      salary: 75000,
      category: 'Management'
    },
    {
      title: 'Frontend Developer',
      company: 'TechNova',
      location: 'Colombo, Sri Lanka',
      salary: 85000,
      category: 'IT'
    },
    {
      title: 'Finance Analyst',
      company: 'CapitalEdge',
      location: 'Kandy, Sri Lanka',
      salary: 90000,
      category: 'Finance'
    }
  ];

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const filteredJobs = allJobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category ? job.category === category : true;
    const matchLocation = location
      ? job.location.toLowerCase().includes(location.toLowerCase())
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
          <option value="Management">Management</option>
          <option value="Finance">Finance</option>
        </select>

        <input
          type="text"
          placeholder="Location (e.g., Colombo)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </section>

      <h2 className="section-title">Available Jobs</h2>
      <div className="job-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => <JobCard key={index} job={job} />)
        ) : (
          <p className="no-results">No jobs found matching your filters.</p>
        )}
      </div>
    </div>
  );
}
