import { useEffect, useState } from 'react';
import { fetchDashboardStats } from '../services/dashboardService';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    users: 0,
    courses: 0,
    migrations: 0,
    stories: 0,
    countries: 0,
    companies: 0, // ✅ added
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchDashboardStats();
        setStats(res.data);
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2 className="dashboard-card-title jobs">Jobs</h2>
          <p>{stats.jobs} Total</p>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title users">Users</h2>
          <p>{stats.users} Registered</p>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title companies">Companies</h2>
          <p>{stats.companies} Registered</p>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title courses">Courses</h2>
          <p>{stats.courses} Published</p>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title migrations">Visa</h2>
          <p>{stats.migrations} Articles</p>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title stories">Stories</h2>
          <p>{stats.stories} Shared</p>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title countries">Countries</h2>
          <p>{stats.countries} Listed</p>
        </div>
      </div>
    </div>
  );
}
