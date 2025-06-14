import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from './Divider';
import { Link, useNavigate } from 'react-router-dom';
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

    if (!user?.id) return null;

    const wrapClose = (cb) => (e) => {
        close?.();
        cb?.();
    };

    return (
        <div className="p-2 bg-white relative  ">
            <div className="">
                <div className="">
                    <div className="font-semibold mb-2">My Account</div>

                    <div className="text-sm mb-2 py-2">
                        <Link
                            to="/dashboard/profile"
                            onClick={wrapClose()}
                            className="flex items-center gap-2 hover:bg-gray-200 rounded px-2"
                        >
                            <span className="truncate">{user.name || user.mobile}</span>
                            <HiOutlineExternalLink />
                        </Link>
                    </div>

                    <Divider />

                    <div className="text-sm grid gap-3 mt-2 text-gray-600">
                        <Link to="/dashboard/product" onClick={wrapClose()} className="px-2 hover:bg-gray-200 rounded">
                            Product
                        </Link>
                        <Link to="/dashboard/category" onClick={wrapClose()} className="px-2 hover:bg-gray-200 rounded">
                            Category
                        </Link>
                        <Link to="/dashboard/subcategory" onClick={wrapClose()} className="px-2 hover:bg-gray-200 rounded">
                            Sub Category
                        </Link>
                        <Link to="/dashboard/upload-product" onClick={wrapClose()} className="px-2 hover:bg-gray-200 rounded">
                            Upload Product
                        </Link>
                        <Link to="/dashboard/myorders" onClick={wrapClose()} className="px-2 hover:bg-gray-200 rounded">
                            My orders
                        </Link>
                        <Link to="/dashboard/myaddress" onClick={wrapClose()} className="px-2 hover:bg-gray-200 rounded">
                            Saved Address
                        </Link>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
