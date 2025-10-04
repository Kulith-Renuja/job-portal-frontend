// /src/company/CompanyProfile.jsx
import { useAuth } from '../context/AuthContext';
import './CompanyProfile.css';
import avatar from '../assets/avatar.png'; // Your static user image
import { useNavigate } from 'react-router-dom';

export default function CompanyProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const joinDate = new Date(parseInt(user?._id.substring(0, 8), 16) * 1000).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="account-container">
      <div className="account-header">
        <img src={avatar} alt="User Avatar" className="account-avatar" />
        <div className="account-info">
          <h2>{user?.name}</h2>
          <p>Member since {joinDate}</p>
          <div className="account-actions">
            <button className="reset-btn">
              🔑 Reset Password
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      <div className="account-contact">
        <h3>Contact Information</h3>
        <div className="contact-grid">
          <div className="contact-card">
            <span>📧</span>
            <div>
              <p className="label">Email Address</p>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className="contact-card">
            <span>📞</span>
            <div>
              <p className="label">Phone Number</p>
              <p>{user?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
