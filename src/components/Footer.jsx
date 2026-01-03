import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">Godayana.lk</div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/stories">Stories</a>
          <a href="/courses">Courses</a>
          <a href="/about">About</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Godayana (PVT) Ltd. All rights reserved.</p>
        <a href="mailto:info@godayana.lk"><p>info@godayana.lk</p></a>
      </div>
    </footer>
  );
}
