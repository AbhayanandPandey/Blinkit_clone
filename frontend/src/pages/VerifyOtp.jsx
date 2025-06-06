import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import AxiosToastError from '../utils/AxiosToastError';

const VerifyOtp = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const email = localStorage.getItem("forgot_email");

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleChange = (e, i) => {
    const value = e.target.value;
    if (!/^[0-9]{0,1}$/.test(value)) return;
    const newData = [...data];
    newData[i] = value;
    setData(newData);
    if (value && i < 5) {
      inputsRef.current[i + 1].focus();
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !data[i] && i > 0) {
      inputsRef.current[i - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = data.join('');
    if (otp.length < 6) {
      toast.error("Please enter the full 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await Axios({
        ...Api.verify_otp,
        data: { otp, email }
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setData(["", "", "", "", "", ""]);
        navigate('/reset-password');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 flex items-center h-[78vh] justify-center px-4 bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-green-600">
          Welcome to <span className="text-emerald-700">Blinkyt</span>
        </h2>
        <p className="text-center text-gray-500 mb-6">Enter your OTP</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 text-center mb-4">OTP</label>
            <div className="flex gap-3 justify-center">
              {data.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputsRef.current[i] = el)}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="bg-blue-50 w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded focus:border-green-600 outline-none"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold text-white rounded transition duration-200 ${
              data.join('').length === 6 && !loading
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
                Verifying...
              </span>
            ) : (
              'Verify OTP'
            )}
          </button>
        </form>

        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-green-700 hover:text-green-800">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;
