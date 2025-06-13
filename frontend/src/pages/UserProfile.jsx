import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa';
import UserAvatarEdit from '../components/UserAvatarEdit';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import toast from 'react-hot-toast';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';

const UserProfile = () => {
  const user = useSelector(s => s.user);
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

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const trimmed = {
      name: userData.name.trim(),
      email: userData.email.trim(),
      mobile: userData.mobile.trim(),
    };

    if (
      trimmed.name === user.name &&
      trimmed.email === user.email &&
      trimmed.mobile === user.mobile
    ) {
      toast.error("Nothing changed to update.");
      return;
    }

    if (!trimmed.name || !trimmed.email || !trimmed.mobile) {
      toast.error("Fields cannot be empty or just spaces.");
      return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(trimmed.mobile)) {
      toast.error("Enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await Axios({ ...Api.updateUser, data: trimmed });
      const { data: respData } = res;
      if (respData.error) return toast.error(respData.message);

      toast.success("Profile updated!");
      const fresh = await fetchUserDetails();
      dispatch(setUserDetails(fresh.data));
    } catch (err) {
      toast.error(err.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden mb-2 flex items-center justify-center">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <FaRegUserCircle size={65} className="text-gray-400" />
          )}
        </div>
        <button
          onClick={() => setOpenProfile(true)}
          className="text-sm border border-amber-200 hover:bg-amber-300 px-4 py-1 rounded-full"
        >
          Edit
        </button>
      </div>

      {openProfile && <UserAvatarEdit close={() => setOpenProfile(false)} />}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto grid gap-4">
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="p-2 bg-blue-50 rounded outline-none focus:border-amber-300 border"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="p-2 bg-blue-50 rounded outline-none focus:border-amber-300 border"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mobile">Mobile No</label>
          <input
            id="mobile"
            name="mobile"
            type="text"
            className="p-2 bg-blue-50 rounded outline-none focus:border-amber-300 border"
            value={userData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`py-2 rounded font-semibold text-neutral-900 ${
            loading ? "bg-gray-300 cursor-not-allowed" : "bg-amber-200 hover:bg-amber-300"
          }`}
        >
          {loading ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
