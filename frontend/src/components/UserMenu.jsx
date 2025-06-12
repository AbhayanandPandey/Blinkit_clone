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

    const handleLogout = async () => {
        try {
        const response = await Axios({ ...Api.logout });
        if (response.data.success) {
            close?.();
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
        close?.();
        cb?.();
    };

    return (
        <div className="p-4">
        <div className="font-semibold mb-2">My Account</div>

        <div className="text-sm mb-2">
            <Link
            to="/dashboard/profile"
            onClick={wrapClose()}
            className="flex items-center gap-2 hover:text-amber-600"
            >
            <span className="truncate">{user.name || user.mobile}</span>
            <HiOutlineExternalLink />
            </Link>
        </div>

        <Divider />

        <div className="text-sm grid gap-3 mt-2 text-gray-600">
            <Link to="/dashboard/myorders" onClick={wrapClose()} className="px-2 hover:text-amber-600">
            My orders
            </Link>
            <Link to="/dashboard/myaddress" onClick={wrapClose()} className="px-2 hover:text-amber-600">
            Saved Address
            </Link>
            <button
            onClick={wrapClose(handleLogout)}
            className="text-left px-2 text-red-600 hover:text-red-800 cursor-pointer"
            >
            Log Out
            </button>
        </div>
        </div>
    );
    };

    export default UserMenu;
