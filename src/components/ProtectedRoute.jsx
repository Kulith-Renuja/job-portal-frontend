import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // or a loading spinner

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
