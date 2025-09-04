import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import Axios from '../utils/Axios';
import Api from '../config/Api';

const LoginSignupForgot = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        let accessToken = localStorage.getItem('accessToken');
        const cookieToken = Cookies.get('accessToken');

        if (!accessToken && !cookieToken) {
          // try refresh endpoint
          const res = await Axios(Api.refreshToken);
          if (res.data.success) {
            accessToken = res.data.data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            setIsAuth(true);
          } else {
            setIsAuth(false);
          }
        } else {
          setIsAuth(true);
        }
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) return null;

  return isAuth ? <Navigate to="/dashboard/profile" replace /> : <Outlet />;
};

export default LoginSignupForgot;
