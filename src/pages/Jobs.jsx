import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { fetchJobs } from '../services/jobsApi';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  // Temporary mock data - replace with real API later
  useEffect(() => {
    setJobs([
      { id: 1, title: 'Frontend Developer', company: 'Tech Corp', salary: 80000 },
      { id: 2, title: 'Backend Engineer', company: 'Data Systems', salary: 90000 }
    ]);
  }, []);

  return (
    <div className="jobs-page">
      <h1>Available Jobs</h1>
      <div className="jobs-list">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}