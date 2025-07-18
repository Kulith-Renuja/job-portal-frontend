import './MigrationCard.css';
import { Link } from 'react-router-dom';

export default function MigrationCard({ migration }) {
  return (
    <div className="migration-card">
      {migration.image && <img src={migration.image} alt={migration.title} className="migration-image" />}
      <h3 className="migration-title">{migration.title}</h3>
      <p className="migration-subtitle">
        {migration.subtitles && migration.subtitles[0]?.title}
      </p>
      <Link to={`/migration/${migration._id}`} className="migration-btn">
        View Article
      </Link>
    </div>
  );
}