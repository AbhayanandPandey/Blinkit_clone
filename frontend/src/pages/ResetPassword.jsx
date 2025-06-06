import React, { useEffect, useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import AxiosToastError from '../utils/AxiosToastError';

const ResetPassword = () => {
  const [data, setData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const { newPassword, confirmPassword } = data;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error("Session expired. Please re-enter your email.");
      navigate('/forgot-password', { replace: true });
    }
  }, [email, navigate]);

  if (!email) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await Axios({
        ...Api.reset_password,
        data: {
          email,
          newPassword,
          confirmPassword
        }
      });

      if (res.data.success) {
        toast.success(res.data.message || "Password reset successful!");
        navigate('/login');
      } else {
        toast.error(res.data.message || "Failed to reset password.");
      }
    } catch (err) {
      AxiosToastError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 flex items-center h-[78vh] justify-center px-4 bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-green-600">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-500 mb-6">Enter a new password below</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="newPassword" className="block mb-1 font-medium text-gray-700">
              New Password
            </label>
            <div className="flex items-center border rounded px-3 bg-gray-50 focus-within:border-green-500">
              <RiLockPasswordLine className="text-gray-400 mr-2" />
              <input
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full h-12 bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="flex items-center border rounded px-3 bg-gray-50 focus-within:border-green-500">
              <RiLockPasswordLine className="text-gray-400 mr-2" />
              <input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full h-12 bg-transparent outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold text-white rounded transition duration-200 ${
              newPassword && confirmPassword && !loading
                ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-6">
          <p>
            Go back to{' '}
            <Link to="/login" className="text-green-700 hover:text-green-800">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
