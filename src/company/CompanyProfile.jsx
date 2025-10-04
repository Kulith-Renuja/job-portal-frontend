import { useAuth } from '../context/AuthContext';
import './CompanyProfile.css';
import defaultLogo from '../assets/avatar.png'; // add a placeholder image in assets
import { useNavigate } from 'react-router-dom';

export default function CompanyProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const joinDate = new Date(
    parseInt(user?._id?.substring(0, 8), 16) * 1000
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="account-container">
      <div className="account-header">
        <img
          src={user?.logoUrl || defaultLogo}
          alt="Company Logo"
          className="account-avatar"
        />
        <div className="account-info">
          <h2>{user?.name || 'Company Name'}</h2>
          <p className="industry-text">
            Industry: {user?.industry || 'Not specified'}
          </p>
          <p>Member since {joinDate}</p>
          <div className="account-actions">
            <button className="reset-btn">🔑 Reset Password</button>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      <div className="account-contact">
        <h3>Company Contact Information</h3>
        <div className="contact-grid">
          <div className="contact-card">
            <span>📧</span>
            <div>
              <p className="label">Email Address</p>
              <p>{user?.email || 'N/A'}</p>
            </div>
          </div>
          <div className="contact-card">
            <span>📞</span>
            <div>
              <p className="label">Phone Number</p>
              <p>{user?.phone || 'Not provided'}</p>
            </div>
          </div>
          <div className="contact-card">
            <span>🏢</span>
            <div>
              <p className="label">Company Address</p>
              <p>{user?.address || 'Not provided'}</p>
            </div>
          </div>
          <div className="contact-card">
            <span>🌐</span>
            <div>
              <p className="label">Website</p>
              <p>
                {user?.website ? (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
                ) : (
                  'Not provided'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
