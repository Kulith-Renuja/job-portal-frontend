import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchJobs } from '../../services/jobService';
import './JobDetails.css';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await fetchJobs(); // all jobs
        const selected = res.data.find(j => j._id === id);
        setJob(selected);
      } catch (err) {
        console.error('Failed to fetch job', err);
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id]);

  if (loading) return <div className="job-details">Loading...</div>;
  if (!job) return <div className="job-details">Job not found</div>;

  return (
    <div className="job-details">
      <h1 className="job-title">{job.title}</h1>
      <br />
      <p className="job-company">Company - {job.company}</p>
      <p className="job-location">Place - {job.place}</p>
      <br />
      <div className="job-description">
        <p>{job.content}</p>
      </div>
    </div>
  );
}
