import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie'; 

const LoginSignupForgot = () => {
  const accessToken =
    localStorage.getItem('accessToken')
  const data =  Cookies.get('accessToken');

  if (data||accessToken) {
    return <Navigate to="/dashboard/profile" replace />;
  }
  return <Outlet />;
};

export default LoginSignupForgot;

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