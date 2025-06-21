import { Link } from 'react-router-dom';
import './MoreButton.css';

export default function MoreButton({ to }) {
  return (
    <div className="more-button-container">
      <Link to={to} className="more-button">
        More →
      </Link>
    </div>
  );
}
