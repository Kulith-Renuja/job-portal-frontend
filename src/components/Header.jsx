import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">Godayana.lk</Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <nav className={`nav-links ${open ? 'active' : ''}`}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>

          <div className="dropdown" onClick={toggleDropdown}>
            <span className="dropdown-toggle">Categories ▾</span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/migration" onClick={() => setOpen(false)}>Migration</Link>
                <Link to="/stories" onClick={() => setOpen(false)}>Stories</Link>
                 <Link to="/countries" onClick={() => setOpen(false)}>Countries</Link>
              </div>
            )}
          </div>

          <Link to="/jobs" onClick={() => setOpen(false)}>Jobs</Link>
          <Link to="/courses" onClick={() => setOpen(false)}>Courses</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/account" onClick={() => setOpen(false)}>Profile</Link>
        </nav>
      </div>
    </header>
  );
}
