import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">JobPortal</div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/jobs">Jobs</a>
          <a href="/stories">Stories</a>
          <a href="/courses">Courses</a>
          <a href="/about">About</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
      </div>
    </footer>
  );
}
