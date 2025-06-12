import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa';
import UserAvatarEdit from '../components/UserAvatarEdit';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import toast from 'react-hot-toast';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';

const UserProfile = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [openProfile, setOpenProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = e => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (
      userData.name === user.name &&
      userData.email === user.email &&
      userData.mobile === user.mobile
    ) {
      toast.error("Nothing changed to update.");
      return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(userData.mobile)) {
      toast.error("Please enter a valid 10‑digit mobile number.");
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({ ...Api.updateUser, data: userData });
      const { data: respData } = response;

      if (respData.error) {
        toast.error(respData.message);
      } else if (respData.success) {
        toast.success("Profile updated successfully");

        const fresh = await fetchUserDetails();
        dispatch(setUserDetails(fresh.data));
      }
    } catch (err) {
      AxiosToastError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-20 h-20 bg-red-400 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img alt={user.name} src={user.avatar} className="h-full w-full" />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
      <button
        onClick={() => setOpenProfile(true)}
        className="min-w-20 text-sm cursor-pointer border border-amber-200 hover:bg-amber-300 px-3 py-1 rounded-full mt-3"
      >
        Edit
      </button>
      {openProfile && (
        <UserAvatarEdit close={() => setOpenProfile(false)} />
      )}

      <form onSubmit={handleSubmit} className="my-4 grid gap-4">
        <div className="grid">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            className="p-2 bg-blue-50 rounded outline-blue-400"
            value={userData.name}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="p-2 bg-blue-50 rounded outline-blue-400"
            value={userData.email}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Mobile no</label>
          <input
            id="mobile"
            name="mobile"
            type="text"
            placeholder="Enter your mobile"
            className="p-2 bg-blue-50 rounded outline-blue-400"
            value={userData.mobile}
            onChange={handleOnChange}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 font-semibold rounded text-neutral-900 transition ${
            loading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-amber-200 hover:bg-amber-300'
          }`}
        >
          {loading ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
