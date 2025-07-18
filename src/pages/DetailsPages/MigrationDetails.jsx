import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMigrations } from '../../services/migrationService';
import './MigrationDetails.css';

export default function MigrationDetails() {
  const { id } = useParams();
  const [migration, setMigration] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMigration = async () => {
      try {
        const res = await fetchMigrations();
        const found = res.data.find(m => m._id === id);
        setMigration(found);
      } catch (err) {
        console.error('Failed to load migration:', err);
      } finally {
        setLoading(false);
      }
    };
    loadMigration();
  }, [id]);

  if (loading) return <div className="migration-details">Loading...</div>;
  if (!migration) return <div className="migration-details">Migration not found.</div>;

  return (
    <div className="migration-details">
      <h1 className="migration-title">{migration.title}</h1>
      {migration.image && (
        <img src={migration.image} alt={migration.title} className="migration-image" />
      )}

      <div className="migration-content">
        {migration.subtitles.map((sub, index) => (
          <div key={index} className="subtitle-section">
            <h3>{sub.title}</h3>
            <p>{sub.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
