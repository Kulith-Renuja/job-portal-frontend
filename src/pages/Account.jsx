// src/pages/Account.jsx
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Account.css';
import avatar from '../assets/avatar.png'; // Your static user image

export default function Account() {
  // We're now also getting the 'isCompany' flag from the AuthContext.
  const { user, logout, isCompany } = useAuth();
  const navigate = useNavigate();

  // Return a loading state if the user object is not yet available.
  if (!user) {
    return <div>Loading user data...</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const goToCompanyDashboard = () => {
    navigate('/company-dashboard');
  };
  
    const resetPassword = async () => {
    try {
      // Show a confirmation message to the user
      const confirmed = window.confirm("A password reset link will be sent to your email. Do you want to continue?");
      if (!confirmed) return;

      // Make a POST request to your backend API endpoint
      const response = await fetch('/api/reset-password-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });

      if (response.ok) {
        alert("Password reset link sent! Please check your email.");
      } else {
        const errorData = await response.json();
        alert(`Failed to send reset link: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error sending reset password request:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const joinDate = new Date(parseInt(user?._id.substring(0, 8), 16) * 1000).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  // Helper function to get the appropriate CSS class for the company status badge
  const getStatusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  return (
    <div className="account-container">
      <div className="account-header">
        <img src={avatar} alt="User Avatar" className="account-avatar" />
        <div className="account-info">
          {/* This title will always be the user's name as requested */}
          <h2>{user?.name}</h2>
          <p>Member since {joinDate}</p>
          <div className="account-actions">
            {/* Conditionally show either the 'Reset Password' or 'Company Dashboard' button */}
            {isCompany ? (
              <>
              <button className="dashboard-btn" onClick={goToCompanyDashboard}>
                💼 Company Dashboard
              </button>
              <button className="reset-btn" onClick={resetPassword}>
                🔑 Reset Password
              </button>
              </>
            ) : (
              <button className="reset-btn" onClick={resetPassword}>
                🔑 Reset Password
              </button>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Conditionally render the company-specific details block below the main user info */}

      {isCompany ? (
        <div className="company-details">
          <h3>Company Information</h3>
          <p className={`company-status-badge ${getStatusClass(user.companyStatus)}`}>
            Status: {user.companyStatus}
          </p>
          <div className="contact-grid">
            <div className="contact-card">
              <span>🆔</span>
              <div>
                <p className="label">Registration Number</p>
                <p>{user.registrationNumber}</p>
              </div>
            </div>
            <div className="contact-card">
              <span>📍</span>
              <div>
                <p className="label">Company Address</p>
                <p>{user.address}</p>
              </div>
            </div>
            <div className="contact-card">
              <span>🙋</span>
              <div>
                <p className="label">Contact Person</p>
                <p>{user.contactPerson}</p>
              </div>
            </div>
            <div className="contact-card">
              <span>📞</span>
              <div>
                <p className="label">Contact Phone</p>
                <p>{user.phone}</p>
              </div>
            </div>
            <div className="contact-card">
              <span>📧</span>
              <div>
                <p className="label">Contact Email</p>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="contact-card">
              <span>🌐</span>
              <div>
                <p className="label">Website</p>
                <p>{user.website || 'N/A'}</p>
              </div>
            </div>
            <div className="contact-card">
              <span>🏢</span>
              <div>
                <p className="label">Company Size</p>
                <p>{user.companySize}</p>
              </div>
            </div>
            <div className="contact-card">
              <span>🏭</span>
              <div>
                <p className="label">Industry</p>
                <p>{user.industry}</p>
              </div>
            </div>
          </div>
          <div className="description-card">
            <h4>Description</h4>
            <p>{user.description}</p>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
