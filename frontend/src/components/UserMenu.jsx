import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from './Divider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import { logout } from '../store/userSlice';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { HiOutlineExternalLink } from 'react-icons/hi';

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // 🟢 Used for detecting current route

  if (!user?.id) return null;

  const handleLogout = async () => {
    try {
      await Axios(Api.logout);
      dispatch(logout());
      toast.success('Logout successful');
      navigate('/');
      close?.();
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const linkClass = (path) =>
    `block px-2 py-1 rounded text-sm ${
      location.pathname === path
        ? 'bg-green-100 text-green-700 font-medium'
        : 'hover:bg-gray-100'
    }`;

  return (
    <div className="p-2 bg-white relative">
      <div>
        <div className="font-semibold mb-2">My Account</div>

        <div className="text-sm mb-2 py-2">
          <Link
            to="/dashboard/profile"
            onClick={close}
            className={`flex items-center gap-2 px-2 rounded ${
              location.pathname === '/dashboard/profile'
                ? 'bg-green-100 text-green-700 font-medium'
                : 'hover:bg-gray-100'
            }`}
          >
            <span className="truncate">
              {user.name || user.mobile}{' '}
              <span className="font-medium text-red-600">
                {user.role === 'Admin' ? '(Admin)' : ''}
              </span>
            </span>
            <HiOutlineExternalLink />
          </Link>
        </div>

        <Divider />

        <div className="text-sm grid gap-1 mt-2 text-gray-700">
          {user.role === 'Admin' ? (
            <>
              <Link to="/dashboard/category" onClick={close} className={linkClass('/dashboard/category')}>
                Category
              </Link>
              <Link to="/dashboard/subcategory" onClick={close} className={linkClass('/dashboard/subcategory')}>
                Sub Category
              </Link>
              <Link to="/dashboard/product" onClick={close} className={linkClass('/dashboard/product')}>
                Product
              </Link>
              <Link to="/dashboard/upload-product" onClick={close} className={linkClass('/dashboard/upload-product')}>
                Upload Product
              </Link>
              <Link to="/dashboard/myorders" onClick={close} className={linkClass('/dashboard/myorders')}>
                My Orders
              </Link>
              <Link to="/dashboard/myaddress" onClick={close} className={linkClass('/dashboard/myaddress')}>
                Saved Address
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard/myorders" onClick={close} className={linkClass('/dashboard/myorders')}>
                My Orders
              </Link>
              <Link to="/dashboard/myaddress" onClick={close} className={linkClass('/dashboard/myaddress')}>
                Saved Address
              </Link>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserMenu;
