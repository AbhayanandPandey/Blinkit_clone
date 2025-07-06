import React, { useState } from 'react';
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
  const location = useLocation(); 
  const [activePath, setActivePath] = useState(location.pathname);

  if (!user?.id) return null;

  const wrapClose = (path) => () => {
    close?.();
    setActivePath(path); 
  };

  const linkClass = (path) =>
    `px-2 rounded ${
      activePath === path ? 'bg-green-100 text-green-700 font-medium' : 'hover:bg-gray-200'
    }`;

  return (
    <div className="p-2 bg-white relative">
      <div>
        <div>
          <div className="font-semibold mb-2">My Account</div>

          <div className="text-sm mb-2 py-2">
            <Link
              to="/dashboard/profile"
              onClick={wrapClose('/dashboard/profile')}
              className={`flex items-center gap-2 px-2 rounded ${
                activePath === '/dashboard/profile'
                  ? 'bg-green-100 text-green-700 font-medium'
                  : 'hover:bg-gray-200'
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

          <div className="text-sm grid gap-3 mt-2 text-gray-600">
            {user.role === 'Admin' ? (
              <>
                <Link to="/dashboard/category" onClick={wrapClose('/dashboard/category')} className={linkClass('/dashboard/category')}>
                  Category
                </Link>
                <Link to="/dashboard/subcategory" onClick={wrapClose('/dashboard/subcategory')} className={linkClass('/dashboard/subcategory')}>
                  Sub Category
                </Link>
                <Link to="/dashboard/product" onClick={wrapClose('/dashboard/product')} className={linkClass('/dashboard/product')}>
                  Product
                </Link>
                <Link to="/dashboard/upload-product" onClick={wrapClose('/dashboard/upload-product')} className={linkClass('/dashboard/upload-product')}>
                  Upload Product
                </Link>
                <Link to="/dashboard/myorders" onClick={wrapClose('/dashboard/myorders')} className={linkClass('/dashboard/myorders')}>
                  My Orders
                </Link>
                <Link to="/dashboard/myaddress" onClick={wrapClose('/dashboard/myaddress')} className={linkClass('/dashboard/myaddress')}>
                  Saved Address
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard/myorders" onClick={wrapClose('/dashboard/myorders')} className={linkClass('/dashboard/myorders')}>
                  My Orders
                </Link>
                <Link to="/dashboard/myaddress" onClick={wrapClose('/dashboard/myaddress')} className={linkClass('/dashboard/myaddress')}>
                  Saved Address
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
