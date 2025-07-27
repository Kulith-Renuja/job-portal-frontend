import { Link } from 'react-router-dom';
import './JobCard.css';

export default function JobCard({ job }) {
  const formattedDate = new Date(job.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="job-card full-width">
      <div className="job-card-header">
        <h3 className="job-title">{job.title}</h3>
        <p className="job-company">{job.company}</p>
        <p className="job-location">{job.place}</p>
      </div>
      <div className="job-footer">
        <span className="posted-date">Posted: {formattedDate}</span>
        <Link to={`/jobs/${job._id}`}>
          <button className="job-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}
