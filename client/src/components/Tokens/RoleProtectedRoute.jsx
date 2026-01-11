import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../../api/public/auth/parts/authContext';

const RoleProtectedRoute = ({ allowedRoles }) => {
  const { session, loading } = useAuth();

  if (loading) return null;

  const lastRole = localStorage.getItem("lastRole");

  if (!session) {
    if (lastRole === "Customer") {
      return <Navigate to="/customerlogin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  if (!allowedRoles.includes(session.access_type)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
