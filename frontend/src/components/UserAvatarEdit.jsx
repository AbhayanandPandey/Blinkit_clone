import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserAvatarEdit = () => {
  const user = useSelector((state) => state.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0] || null);
    const file = e.target.files[0];
    const formData = new FormData()
    formData.append('avatar',file)
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
        const respone = Axios
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 bg-neutral-900/60 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white max-w-sm w-full rounded-xl p-6 flex flex-col items-center">
        
        <div className="w-24 h-24 bg-red-400 flex items-center justify-center rounded-full overflow-hidden drop-shadow-md mb-4">
          {user.avatar && !selectedFile ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full" />
          ) : selectedFile ? (
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="w-full h-full object-cover" />
          ) : (
            <FaRegUserCircle size={72} className="text-gray-300" />
          )}
        </div>

        <label htmlFor="profileImg" className="cursor-pointer text-sm text-blue-600 hover:underline mb-2">
          {selectedFile ? 'Change profile picture' : 'Choose new profile picture'}
        </label>
        <input
          type="file"
          id="profileImg"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className=" w-full text-sm text-gray-700 mb-4 hidden"
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

const fakeUpload = () => new Promise((resolve) => setTimeout(resolve, 2000));

export default UserAvatarEdit;
