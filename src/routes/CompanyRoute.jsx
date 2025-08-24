import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CompanyRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth();

  // Show a loading screen while authentication status is being checked
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // If authenticated but not a 'company' user, redirect to home
  if (user?.role !== 'company') {
    return <Navigate to="/" replace />;
  }

  // If the company user is not yet approved, redirect to their account page
  if (user?.companyStatus !== 'approved') {
    // Optionally, you could show a message indicating that the company is not approved yet
    console.warn('Company account is not approved yet. We will approve after checking your company details. Redirecting to account page.');
    // You could also show a message here instead of a redirect
    return <Navigate to="/account" replace />;
  }

  // If all checks pass, render the children (CompanyDashboard)
  return children;
}
