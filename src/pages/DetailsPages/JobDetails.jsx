import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchJobs } from '../../services/jobService';
import JobApplicationForm from '../../components/jobApplications/JobApplicationForm';
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
      <p className="job-company">Company: {job.company || 'Not specified'}</p>
      <p className="job-location">Location: {job.place || 'N/A'}</p>
      <p className="job-meta">Category: {job.category}</p>
      <p className="job-meta">Job Type: {job.jobType || 'N/A'}</p>
      <p className="job-meta">Salary: {job.salary ? `Rs. ${job.salary}` : 'Negotiable'}</p>
      <p className="job-meta">Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Not mentioned'}</p>
{job.requiredEducationLevel && (
        <div className="job-education-requirements">
          <h3>Education Requirements</h3>
          <p>Minimum Education Level: {job.requiredEducationLevel}</p>
          {job.requiredFieldOfStudy && <p>Required Field of Study: {job.requiredFieldOfStudy}</p>}
          {job.minGraduationYear && <p>Minimum Graduation Year: {job.minGraduationYear}</p>}
        </div>
      )}
      <br />
      <br />
      <h2 className="job-description-title">About the role</h2>
      <div className="job-description">
        <pre style={{ whiteSpace: 'pre-wrap' }}>{job.content}</pre>
      </div>
      {job.image && <img src={job.image} className="job-image" />}
<JobApplicationForm />
    </div>
  );
}
