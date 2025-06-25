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
