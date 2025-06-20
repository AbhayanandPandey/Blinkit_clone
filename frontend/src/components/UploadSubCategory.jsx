import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import UplaodImage from '../utils/uploadImage';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import Api from '../config/Api';

const UploadSubCategory = ({ close }) => {
  const [subData, setSubData] = useState({
    name: '',
    image: '',
    category: [],
  });

  const [loading, setLoading] = useState({
    submit: false,
    image: false,
  });

  const allcategoryData = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading((prev) => ({ ...prev, image: true }));
      const response = await UplaodImage(file);
      const { data: ImageResponse } = response;

      if (ImageResponse?.success && ImageResponse?.data?.url) {
        setSubData((prev) => ({ ...prev, image: ImageResponse.data.url }));
        toast.success('Image uploaded successfully');
      } else {
        toast.error(ImageResponse?.message || 'Image upload failed');
      }
    } catch {
      toast.error('Image upload failed. Try again.');
    } finally {
      setLoading((prev) => ({ ...prev, image: false }));
    }
  };

  const handleRemoveCategory = (Id) => {
    setSubData((prev) => ({
      ...prev,
      category: prev.category.filter((el) => el._id !== Id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading.submit) return;

    try {
      setLoading((prev) => ({ ...prev, submit: true }));

      const payload = {
        ...subData,
        category: subData.category.map((cat) => cat._id),
      };

      const response = await Axios({
        ...Api.addSubCategory,
        data: payload,
      });

      const { data: resData } = response;

      if (resData.error) {
        toast.error(resData.message);
      } else {
        toast.success(resData.message || 'Subcategory created');
        if (close) close();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded max-w-5xl p-5 w-full shadow-lg relative lg:mx-0 mx-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Add New Subcategory</h2>
          <button onClick={close} className="text-gray-700 hover:text-black transition cursor-pointer">
            <IoClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-3">
          {/* Name */}
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              className="bg-blue-50 border border-blue-100 p-2 rounded outline-none focus:ring-2 focus:ring-amber-300"
              type="text"
              name="name"
              id="name"
              value={subData.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="grid gap-1">
            <label>Image</label>
            <div className="flex flex-col gap-3 lg:flex-row items-center">
              <div className="border border-blue-200 h-36 lg:w-36 w-full bg-blue-50 rounded flex justify-center items-center">
                {subData.image ? (
                  <img src={subData.image} alt="subCategory" className="w-full h-full object-scale-down" />
                ) : (
                  <p className="text-neutral-400 text-sm">No Image</p>
                )}
              </div>
              <label htmlFor="uploadsub">
                <div
                  className={`px-5 py-2 rounded text-white font-medium transition cursor-pointer ${
                    loading.image ? 'bg-gray-400' : 'bg-amber-400 hover:bg-amber-500'
                  }`}
                >
                  {loading.image ? 'Uploading...' : 'Upload Image'}
                </div>
                <input
                  type="file"
                  id="uploadsub"
                  name="image"
                  onChange={handleUploadImage}
                  className="hidden"
                  accept="image/*"
                  disabled={loading.image}
                />
              </label>
            </div>
          </div>

          {/* Category Select */}
          <div className="grid gap-1">
            <label>Select Category</label>
            <div className="border border-blue-200 rounded">
              <div className="flex flex-wrap gap-2 p-2">
                {subData.category.map((cat) => (
                  <p key={cat._id} className="bg-white shadow-md px-2 py-1 flex items-center gap-2 rounded text-sm">
                    {cat.name}
                    <span onClick={() => handleRemoveCategory(cat._id)} className="hover:text-red-600 cursor-pointer">
                      <IoClose size={16} />
                    </span>
                  </p>
                ))}
              </div>
              <select
                className="w-full bg-transparent py-2 rounded px-4 outline-none border-t border-blue-100"
                defaultValue=""
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryObj = allcategoryData.find((el) => el._id === value);
                  if (categoryObj && !subData.category.some((cat) => cat._id === value)) {
                    setSubData((prev) => ({
                      ...prev,
                      category: [...prev.category, categoryObj],
                    }));
                  }
                }}
              >
                <option value="" disabled>
                  -- Select Category --
                </option>
                {allcategoryData.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={
              !subData.name || !subData.image || subData.category.length === 0 || loading.submit || loading.image
            }
            className={`px-4 py-2 rounded text-neutral-800 font-medium transition ${
              !subData.name || !subData.image || subData.category.length === 0 || loading.submit || loading.image
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-amber-400 hover:bg-amber-500 cursor-pointer'
            }`}
          >
            {loading.submit ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategory;
