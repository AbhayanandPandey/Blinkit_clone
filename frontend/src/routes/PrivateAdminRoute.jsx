import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';

const PrivateAdminRoute = () => {
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.user.loading);
  if (user === null) {
    return <Loading />; 
  }

  if (user.role !== 'Admin') {
    return <Navigate to={window.history.back()} replace />;
  }

  return <Outlet />;
};

export default PrivateAdminRoute;
