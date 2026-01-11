import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../api/public/auth/parts/authContext';

const PrivateRoute = () => {
  const { session, loading } = useAuth();

  if (loading) return null;

  return session ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
