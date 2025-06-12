import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import toast from 'react-hot-toast'
import { updateAvater } from '../store/userSlice'

const UserAvatarEdit = () => {
  const user = useSelector((state) => state.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await Axios({
        ...Api.uploadAvatar,
        data: formData,
      });
      toast.success('Profile image updated Successful')
      dispatch(updateAvater(response.data?.avatar))
      navigate('/dashboard')
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleCross = () =>{
    navigate('/dashboard')
  }

  return (
    <section className="fixed inset-0 bg-neutral-900/60 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white max-w-sm w-full rounded-xl p-6 flex flex-col items-center">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={handleCross}
        >
          <HiXMark size={24} />
        </button>

        {/* Avatar Display */}
        <div className="w-24 h-24 bg-red-400 flex items-center justify-center rounded-full overflow-hidden drop-shadow-md mb-4">
          {user.avatar && !selectedFile ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : selectedFile ? (
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="w-full h-full object-cover" />
          ) : (
            <FaRegUserCircle size={72} className="text-gray-300" />
          )}
        </div>

        {/* File Input */}
        <label htmlFor="profileImg" className="cursor-pointer text-sm text-blue-600 hover:underline mb-2">
          {selectedFile ? 'Change profile picture' : 'Choose new profile picture'}
        </label>
        <input
          type="file"
          id="profileImg"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="hidden"
        />

        {selectedFile && (
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`relative flex items-center justify-center py-2 px-6 rounded-md font-medium text-white transition cursor-pointer ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-300 hover:bg-amber-400'
            }`}
          >
            {loading && (
              <svg
                className="animate-spin absolute left-4 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        )}
      </div>
    </section>
  );
};

export default UserAvatarEdit;
