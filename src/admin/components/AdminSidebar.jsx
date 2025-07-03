import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

export default function AdminSidebar() {
const { pathname } = useLocation();

return (
<aside className="admin-sidebar">
<h2 className="admin-logo">Admin Panel</h2>
<nav className="admin-nav">
<Link to="/admin/dashboard" className={pathname.includes('dashboard') ? 'active' : ''}>Dashboard</Link>
<Link to="/admin/jobs" className={pathname.includes('jobs') ? 'active' : ''}>Manage Jobs</Link>
<Link to="/admin/courses" className={pathname.includes('courses') ? 'active' : ''}>Manage Courses</Link>
<Link to="/admin/migrations" className={pathname.includes('migrations') ? 'active' : ''}>Manage Migrations</Link>
<Link to="/admin/stories" className={pathname.includes('stories') ? 'active' : ''}>Manage Stories</Link>
<Link to="/admin/countries" className={pathname.includes('countries') ? 'active' : ''}>Manage Countries</Link>
<Link to="/admin/users" className={pathname.includes('users') ? 'active' : ''}>Manage Users</Link>


</nav>
</aside>
);
}