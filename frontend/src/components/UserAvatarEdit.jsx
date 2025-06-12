import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import toast from 'react-hot-toast';
import { updatedAvatar } from '../store/userSlice';
import AxiosToastError from '../utils/AxiosToastError';

const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(""); // track file name

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);            // display file name
    setLoading(true);
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await Axios({
        ...Api.uploadAvatar,
        data: formData
      });
      const newAvatar = res.data?.data?.avatar;
      dispatch(updatedAvatar(newAvatar));
      toast.success('Profile photo updated!');
      close();
    } catch (err) {
      AxiosToastError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white max-w-sm w-full rounded-lg shadow-lg p-6 flex flex-col items-center">
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <IoClose size={24} />
        </button>

        <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-4 shadow-inner flex items-center justify-center">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <FaRegUserCircle size={72} className="text-gray-400" />
          )}
        </div>

        <label
          htmlFor="uploadProfile"
          className="inline-block bg-amber-300 hover:bg-amber-400 text-white font-medium py-2 px-6 rounded-full cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-amber-200"
        >
          {loading ? 'Uploading…' : 'Choose Photo'}
        </label>
        <input
          type="file"
          id="uploadProfile"
          accept="image/jpeg,image/png"
          onChange={handleUploadAvatarImage}
          className="hidden"
        />

        {fileName && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: <span className="font-medium">{fileName}</span>
          </p>
        )}
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
