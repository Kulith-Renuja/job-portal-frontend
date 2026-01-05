import './Footer.css';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">Godayana.lk</div>
        <div className="footer-social">
          <a
            href="https://www.facebook.com/godayana.lk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.linkedin.com/in/godayanalk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>info@godayana.lk</p>
        <p>© {new Date().getFullYear()} Godayana (PVT) Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
