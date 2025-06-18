import './JobCard.css';

export default function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <p className="job-company">{job.company}</p>
      <p className="job-location">{job.location}</p>
      <div className="job-footer">
        <span className="job-salary">${job.salary}</span>
        <button className="job-btn">View Details</button>
      </div>
    </div>
  );
}
