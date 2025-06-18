import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import UserMenu from '../components/UserMenu';
import Divider from '../components/Divider';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import AxiosToastError from '../utils/AxiosToastError';
import { logout } from '../store/userSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...Api.logout });
      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate('/');
      }
    } catch (err) {
      AxiosToastError(err);
    }
  };

  return (
    <section className="bg-white ">
      <div className="container mx-auto px-4 py-6 grid lg:grid-cols-[250px_1fr]">

        <aside className="hidden lg:flex flex-col sticky top-26 h-[calc(96vh-6rem)] border-r border-gray-300 pr-4">
          <div className="flex-1 overflow-y-auto">
            <UserMenu />
          </div>

          <div className="mt-auto pt-1">
            <Divider />
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-1 text-red-600 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              Logout
            </button>
            <Link
              to="/dashboard/fno"
              className="block w-full mt-1 px-3 py-1 text-left hover:bg-gray-100 rounded-md"
            >
              F&O
            </Link>
          </div>
        </aside>

        <main className="bg-white w-full min-h-[78vh] px-2 sm:px-4 py-4">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default Dashboard;
