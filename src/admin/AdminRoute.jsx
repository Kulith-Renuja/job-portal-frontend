import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
