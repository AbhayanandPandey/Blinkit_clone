import React from 'react'
import UserMenu from '../components/UserMenu'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Divider from '../components/Divider'
import Axios from '../utils/Axios'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import Api from '../config/Api'
import AxiosToastError from '../utils/AxiosToastError'
import { logout } from '../store/userSlice'

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

  const wrapClose = (cb) => (e) => {
    cb?.(e);
  };
  const handlefno =async ()=>{
    navigate('/dashboard/fno')
  }

  return (
    <section className='bg-white h-full'>
      <div className='container mx-auto p-3 grid lg:grid-cols-[250px_1fr] gap-10'>
        <div className="py-4 sticky top-24 overflow-auto hidden lg:block h-full">
          <div className='fixed border border-l-0 border-b-0 border-t-0 border-r-neutral-300 h-10/12'>
            <UserMenu />
            <div className='absolute bottom-16 w-full pr-2 gap-3 mt-2'>
              <Divider />
              <button
                onClick={wrapClose(handleLogout)}
                className=" w-full text-left px-3 text-red-600 hover:bg-gray-200 rounded cursor-pointer"
              >
                Logout
              </button>
              <button className="w-full text-left px-3 hover:bg-gray-200 rounded cursor-pointer" onClick={handlefno}>
                <Link to="/dashboard/fno" onClick={wrapClose()} className="mt-2 hover:bg-gray-200 rounded w-full">
                  F&O
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className='bg-white ml-3 p-4 flex justify-center items-center'>
          <div className='w-full'>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
