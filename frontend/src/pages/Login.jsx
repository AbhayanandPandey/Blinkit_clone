import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash, FaLock } from 'react-icons/fa6';
import { MdAlternateEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import AxiosToastError from '../utils/AxiosToastError';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false); // 👈 loader state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormFilled = data.email && data.password;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormFilled) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true); // 👈 start loader
    try {
      const res = await Axios({
        ...Api.login,
        data: data
      });

      if (res.data.error) {
        toast.error(res.data.message || "Login failed");
      }

      if (res.data.success) {
        toast.success(res.data.message || "Login successful!");
        setData({ email: '', password: '' });
        navigate('/');
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false); // 👈 stop loader
    }
  };

  return (
    <section className="py-10 flex items-center h-[78vh] justify-center px-4 bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-green-600">
          Welcome to <span className="text-emerald-700">Blinkyt</span>
        </h2>
        <p className="text-center text-gray-500 mb-6">Login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center border rounded px-3 bg-gray-50 focus-within:border-green-500">
              <MdAlternateEmail className="text-gray-400 mr-2" />
              <input
                name="email"
                id="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full h-12 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center border rounded px-3 bg-gray-50 focus-within:border-green-500">
              <FaLock className="text-gray-400 mr-2" />
              <input
                name="password"
                id="password"
                type={showPass ? 'text' : 'password'}
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-12 bg-transparent outline-none"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="cursor-pointer px-2 text-gray-600"
              >
                {showPass ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

          {/* Submit Button with Loader */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold text-white rounded transition duration-200 ${
              isFormFilled && !loading
                ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <p>
            New user?{' '}
            <Link to="/register" className="text-green-700 hover:text-green-800">
              Register
            </Link>
          </p>
          <p>
            <Link to="/forgotPassword" className="hover:text-green-700">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
