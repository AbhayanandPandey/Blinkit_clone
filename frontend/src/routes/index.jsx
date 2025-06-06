import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from "../pages/home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from '../pages/ForgotPassword'
import VerifyOtp from "../pages/VerifyOtp";
import ResetPassword from "../pages/ResetPassword";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path:'search',
                element:<SearchPage />
            },
            {
                path:'login',
                element:<Login />
            },
            {
                path:'register',
                element:<Register />
            },
            {
                path:'forgot-password',
                element:<ForgotPassword />
            },
            {
                path:'verify-Otp',
                element:<VerifyOtp />
            },
            {
                path:'reset-password',
                element:<ResetPassword />
            }
        ]
    }
])
export default router