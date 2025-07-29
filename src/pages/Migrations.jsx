import { useEffect, useState } from 'react';
import { fetchMigrations } from '../services/migrationService';
import MigrationCard from '../components/MigrationCard';
import './Migrations.css';

export default function Migrations() {
  const [migrations, setMigrations] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchMigrations();
        setMigrations(res.data);
      } catch (err) {
        console.error('Failed to load migrations', err);
      }
    };
    load();
  }, []);

  const filtered = migrations.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="migrations-page">
      <section className="migrations-header">
        <h1>ගොඩයන Visa</h1>
        {/*<p>Learn how to move, settle, and thrive in new countries.</p>*/}
        <div className="migration-search-bar">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className="migrations-grid">
        {filtered.map((m) => (
          <MigrationCard key={m._id} migration={m} />
        ))}
      </section>
    </div>
  );
}