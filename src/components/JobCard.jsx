import { Link } from 'react-router-dom';
import './JobCard.css';

export default function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <p className="job-company">{job.company}</p>
      <p className="job-location">{job.place}</p>
      <div className="job-footer">
        <Link to={`/jobs/${job._id}`}>
          <button className="job-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}
