import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">JobPortal</Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <nav className={`nav-links ${open ? 'active' : ''}`}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/categories" onClick={() => setOpen(false)}>Categories</Link>
          <Link to="/account" onClick={() => setOpen(false)}>Account</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/stories" onClick={() => setOpen(false)}>Stories</Link>
          <Link to="/jobs" onClick={() => setOpen(false)}>Jobs</Link>
          <Link to="/courses" onClick={() => setOpen(false)}>Courses</Link>
        </nav>
      </div>
    </header>
  );
}
