import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserMenu from '../components/UserMenu'
import { IoClose } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import Axios from '../utils/Axios'
import Api from '../config/Api'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { logout } from '../store/userSlice'

const UserMenuMobile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
  return (
    <div>
      <section className="bg-white h-full w-full py-2">
        <button onClick={() => navigate('/')} className='text-neutral-800 block w-fit ml-auto'>
          <IoClose size={25} />
        </button>
        <div className="container mx-auto px-3 pb-8">
          <UserMenu />
          <button
            onClick={wrapClose(handleLogout)}
            className=" w-full text-left px-3 text-red-600 hover:bg-gray-200 rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      </section>
    </div>
  )
}

export default UserMenuMobile
