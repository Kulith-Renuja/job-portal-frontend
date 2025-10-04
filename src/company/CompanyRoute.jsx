// /src/company/CompanyRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CompanyRoute({ children }) {
  const { user, isAuthenticated, loading } = useAuth();

  // Wait until AuthContext finishes loading localStorage
  if (loading) return null;

  if (!isAuthenticated || user?.role !== "company") {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
