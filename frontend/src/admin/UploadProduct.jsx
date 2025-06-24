import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import { MdOutlineDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import UploadImage from '../utils/uploadImage'; 

const UploadProduct = () => {
  const [imageUploading, setImageUploading] = useState(false);
  const allCategory = useSelector((state) => state.product.allCategory);

  const [data, setData] = useState({
    name: '',
    image: [],
    category: [],
    subCategory: [],
    unit: [],
    stock: '',
    price: '',
    discount: '',
    description: '',
    more_details: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setImageUploading(true);
      const response = await UploadImage(file); // Must return { data: { data: { url } } }
      const { data: ImageResponse } = response;
      const imageUrl = ImageResponse.data.url;

      setData((prev) => ({
        ...prev,
        image: [...prev.image, imageUrl],
      }));
    } catch (err) {
      toast.error('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = (index) => {
    setData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  const handleSelectCategory = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) return;

    const selectedCategory = allCategory.find((cat) => cat._id === selectedId);

    if (
      selectedCategory &&
      !data.category.find((cat) => cat._id === selectedCategory._id)
    ) {
      setData((prev) => ({
        ...prev,
        category: [...prev.category, selectedCategory],
      }));
    }

    e.target.value = '';
  };

  const removeCategory = (id) => {
    setData((prev) => ({
      ...prev,
      category: prev.category.filter((c) => c._id !== id),
    }));
  };

  return (
    <section>
      <div className="p-2 pl-8 bg-white shadow-md flex items-center justify-between pr-8">
        <h2 className="font-semibold text-lg">Upload Product</h2>
      </div>

      <div className="grid p-7">
        <form className="grid gap-3">
          <div className="grid gap-1">
            <label htmlFor="name" className="font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Product name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border border-blue-200 rounded"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="description" className="font-semibold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter Product description"
              value={data.description}
              onChange={handleChange}
              required
              rows={3}
              className="bg-blue-50 p-2 outline-none border border-blue-200 rounded resize-none"
            />
          </div>

          <div className="grid gap-1">
            <p className="mb-0 font-semibold text-gray-700">Images</p>
            <label
              htmlFor="image"
              className="bg-blue-50 h-28 border-2 border-dashed border-blue-300 rounded-lg flex justify-center items-center cursor-pointer hover:bg-blue-100 transition-all duration-200"
            >
              <div className="text-center flex flex-col items-center justify-center text-blue-500">
                {imageUploading ? (
                  <ImSpinner8 className="animate-spin" size={26} />
                ) : (
                  <>
                    <FaCloudUploadAlt size={30} />
                    <p className="text-sm mt-1">Click to upload</p>
                  </>
                )}
              </div>
              <input
                type="file"
                id="image"
                className="hidden"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </label>

            {data.image.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-4">
                {data.image.map((img, i) => (
                  <div
                    key={img + i}
                    className="relative h-24 w-24 border border-gray-200 rounded-md overflow-hidden group"
                  >
                    <img
                      src={img}
                      alt={`img-${i}`}
                      className="w-full h-full object-scale-down"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute bottom-0 cursor-pointer right-1 bg-white rounded-full p-1 text-red-600 hover:text-red-800 group-hover:opacity-100 opacity-0 transition-all"
                      title="Remove"
                    >
                      {/* <MdOutlineDelete size={18} /> */}
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-1">
            <label htmlFor="category" className="font-semibold text-gray-700">
              Category
            </label>
            <select
              id="category"
              className="bg-blue-50 outline-none border border-blue-200 w-full p-2 rounded"
              onChange={handleSelectCategory}
            >
              <option value="">Select Category</option>
              {allCategory.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {data.category.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {data.category.map((cat) => (
                  <span
                    key={cat._id}
                    className="bg-gray-200 text-neutral-800 px-2 py-1 rounded-full flex items-center gap-2 text-sm "
                  >
                    {cat.name}
                    <button
                      type="button"
                      onClick={() => removeCategory(cat._id)}
                      className="text-gray-600 font-bold hover:text-red-600 cursor-pointer"
                      title="Remove"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

        </form>
      </div>
    </section>
  );
};

export default UploadProduct;
