import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2 className="dashboard-card-title jobs">Jobs</h2>
          <p>120 Total</p>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title users">Users</h2>
          <p>350 Registered</p>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title courses">Courses</h2>
          <p>28 Published</p>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title migrations">Migrations</h2>
          <p>9 Articles</p>
        </div>
      </div>
    </div>
  );
}
