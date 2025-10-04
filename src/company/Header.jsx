import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Header.css";

export default function CompanyHeader() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null); // for mobile menu

  const toggleMenu = () => setOpen(!open);

  // Close mobile nav when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !event.target.closest(".menu-toggle") // allow clicking on ☰ itself
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo -> link to dashboard */}
        <Link to="/company/dashboard" className="logo">
          Godayana.lk
        </Link>

        {/* Mobile menu toggle */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        {/* Nav links */}
        <nav
          className={`nav-links ${open ? "active" : ""}`}
          ref={navRef}
        >
          <Link to="/company/dashboard" onClick={() => setOpen(false)}>
            Dashboard
          </Link>
          <Link to="/company/jobs" onClick={() => setOpen(false)}>
            Jobs
          </Link>
          <Link to="/company/adds" onClick={() => setOpen(false)}>
            Adds
          </Link>
          <Link to="/company/profile" onClick={() => setOpen(false)}>
            Profile
          </Link>
          
        </nav>
      </div>
    </header>
  );
}
