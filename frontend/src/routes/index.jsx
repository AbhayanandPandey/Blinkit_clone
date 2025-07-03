import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from "../pages/home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from '../pages/ForgotPassword';
import VerifyOtp from "../pages/VerifyOtp";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import UserProfile from "../pages/UserProfile";
import MyOrder from "../pages/MyOrder";
import Address from "../pages/Address";
import Product from "../admin/Product";
import SubCategory from "../admin/SubCategory";
import Category from "../admin/Category";
import UploadProduct from "../admin/UploadProduct";
import Fno from "../pages/Fno";
import PrivateAdminRoute from "../routes/PrivateAdminRoute"; // 👈 Import here
import LoginSignupForgot from "./LoginSignupForgot";
import ProductListPage from "../pages/ProductListPage";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'search', element: <SearchPage /> },
      {
        element: <LoginSignupForgot />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'forgot-password', element: <ForgotPassword /> },
        ],
      },
      { path: 'verify-Otp', element: <VerifyOtp /> },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: 'user', element: <UserMenuMobile /> },

      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          { path: 'profile', element: <UserProfile /> },
          { path: 'myorders', element: <MyOrder /> },
          { path: 'myaddress', element: <Address /> },

          {
            element: <PrivateAdminRoute />,
            children: [
              { path: 'product', element: <Product /> },
              { path: 'subcategory', element: <SubCategory /> },
              { path: 'category', element: <Category /> },
              { path: 'upload-product', element: <UploadProduct /> },
            ],
          },

          { path: 'fno', element: <Fno /> },
        ],
      },
      {
        path: ':category',
        children: [
          {
            path: 'subcategory',
            element: <ProductListPage />
          }
        ]
      }
    ],
  },
]);

export default router;
