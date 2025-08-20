import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './JobCard.css';

export default function JobCard({ job }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const formattedDate = new Date(job.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleApply = () => {
    if (isAuthenticated) {
      // For now, we'll navigate to the job details page where the application form will be
      // In the future, this could open a modal or navigate to a dedicated application page
      navigate(`/jobs/${job._id}`);
    } else {
      // Redirect to authentication page
      navigate('/auth');
    }
  };

  return (
    <Link to={`/jobs/${job._id}`} className="job-link">
    <div className="job-card full-width">
      <div className="job-card-header">
        <h3 className="job-title">{job.title}</h3>
        <p className="job-company">{job.company}</p>
        <p className="job-location">{job.place}</p>
      </div>
      <div className="job-footer">
        <span className="posted-date">Posted: {formattedDate}</span>
          <button className="job-btn" onClick={(e) => {
            e.preventDefault();
            handleApply();
          }}>Apply Now</button>
      </div>
    </div>
    </Link>
  );
}
