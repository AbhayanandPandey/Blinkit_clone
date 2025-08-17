import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const LoginSignupForgot = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const cookieAccess = Cookies.get("accessToken");
  const cookieRefresh = Cookies.get("refreshToken");

  const hasLocalTokens = accessToken && refreshToken;
  const hasCookieTokens = cookieAccess && cookieRefresh;

  if (hasLocalTokens || hasCookieTokens) {
    return <Navigate to="/dashboard/profile" replace />;
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

  return <Outlet />
};

export default LoginSignupForgot;
