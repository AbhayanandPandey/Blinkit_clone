import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import Axios from '../utils/Axios'
import Api from '../config/Api'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { logout } from '../store/userSlice'
import { clearCart } from '../store/CartProduct' // 🔥 import clearCart
import UserMenu from '../components/UserMenu'

const UserMenuMobile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...Api.logout });
      if (response.data.success) {
        dispatch(logout());
        dispatch(clearCart()); // 🔥 clear cart from redux
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        toast.success(response.data.message);
        navigate('/');
      }
    } catch (err) {
      AxiosToastError(err);
    }
  };

  return (
    <div>
      <section className="bg-white h-full w-full py-2">
        <button onClick={() => window.history.back()} className='text-neutral-800 block w-fit ml-auto'>
          <IoClose size={25} />
        </button>
        <div className="container mx-auto px-3 pb-8">
          <UserMenu />
          <button
            onClick={handleLogout}
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
