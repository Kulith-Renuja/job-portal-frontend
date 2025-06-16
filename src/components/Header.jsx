import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">JobPortal</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/account">Account</Link>
        <Link to="/about">About</Link>
        <Link to="/stories">Stories</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/courses">Courses</Link>
      </nav>
    </header>
  );
}
