import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; //
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null); // for mobile menu
  const { isAuthenticated } = useAuth(); // 

  const toggleMenu = () => setOpen(!open);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Close dropdown and mobile nav when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }

      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !event.target.closest('.menu-toggle') // allow clicking on ☰ itself
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">Godayana.lk</Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <nav className={`nav-links ${open ? 'active' : ''}`} ref={navRef}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>

          <div className="dropdown" onClick={toggleDropdown} ref={dropdownRef}>
            <span className="dropdown-toggle">Categories ▾</span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/visa" onClick={() => setOpen(false)}>Visa</Link>
                <Link to="/stories" onClick={() => setOpen(false)}>Stories</Link>
                <Link to="/countries" onClick={() => setOpen(false)}>Countries</Link>
              </div>
            )}
          </div>

          <Link to="/jobs" onClick={() => setOpen(false)}>Jobs</Link>
          <Link to="/courses" onClick={() => setOpen(false)}>Courses</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          {isAuthenticated ? (
            <Link to="/account" onClick={() => setOpen(false)}>Profile</Link>
          ) : (
            <Link to="/auth" onClick={() => setOpen(false)}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
