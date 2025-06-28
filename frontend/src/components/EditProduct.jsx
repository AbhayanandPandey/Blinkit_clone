import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import uploadImage from '../utils/UploadImage';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import ViewImage from '../components/ViewImage';
import AddField from '../components/AddField';
import Loading from '../components/Loading';

const EditProduct = ({ data: productData, close, fetchData }) => {
  const [form, setForm] = useState({
    ...productData,
    more_details: productData.more_details || {},
  });

  const [loading, setLoading] = useState({ upload: false, submit: false });
  const [imageView, setImageView] = useState('');
  const [addField, setAddField] = useState(false);
  const [fieldName, setFieldName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading((prev) => ({ ...prev, upload: true }));
      const response = await uploadImage(file);
      const { data: imgRes } = response;

      if (imgRes?.success) {
        setForm((prev) => ({
          ...prev,
          image: [...prev.image, imgRes.data.url],
        }));
        toast.success('Image uploaded');
      } else {
        toast.error(imgRes?.message || 'Failed to upload image');
      }
    } catch {
      toast.error('Image upload failed');
    } finally {
      setLoading((prev) => ({ ...prev, upload: false }));
    }
  };

  const removeImage = (index) => {
    const newImages = [...form.image];
    newImages.splice(index, 1);
    setForm((prev) => ({ ...prev, image: newImages }));
  };

  const handleFieldAdd = () => {
    if (fieldName.trim()) {
      setForm((prev) => ({
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: '',
        },
      }));
      setFieldName('');
      setAddField(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading((prev) => ({ ...prev, submit: true }));
      const response = await Axios({
        ...Api.updateProduct,
        data: {
          productId: form._id,
          ...form,
        },
      });

      const { data: resData } = response;
      if (resData.success) {
        toast.success(resData.message);
        fetchData();
        close();
      } else {
        toast.error(resData.message || 'Update failed');
      }
    } catch (err) {
      AxiosToastError(err);
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded max-w-5xl p-5 w-full shadow-lg relative lg:mx-0 mx-3 max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Edit Product</h2>
          <button onClick={close} className="text-gray-700 hover:text-black transition cursor-pointer">
            <IoClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              className="bg-blue-50 border border-blue-100 p-2 rounded outline-none focus:ring-2 focus:ring-amber-300"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="description">Description</label>
            <textarea
              className="bg-blue-50 border border-blue-100 p-2 rounded resize-none outline-none focus:ring-2 focus:ring-amber-300"
              rows="3"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product description"
              required
            />
          </div>

          <div className="grid gap-1">
            <label>Images</label>
            <div className="flex flex-col gap-3 lg:flex-row items-start">
              <div className="grid grid-cols-5 gap-2">
                {form.image?.map((img, i) => (
                  <div key={i} className="relative group w-20 h-20 bg-blue-50 border rounded">
                    <img
                      src={img}
                      alt="preview"
                      onClick={() => setImageView(img)}
                      className="w-full h-full object-contain cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                    >
                      <MdDelete size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <label htmlFor="uploadImage">
                <div
                  className={`px-5 py-2 rounded text-white font-medium transition cursor-pointer mt-2 lg:mt-0 ${
                    loading.upload ? 'bg-gray-400' : 'bg-amber-400 hover:bg-amber-500'
                  }`}
                >
                  {loading.upload ? 'Uploading...' : 'Upload Image'}
                </div>
                <input
                  type="file"
                  id="uploadImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={loading.upload}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1">
              <label htmlFor="unit">Unit</label>
              <input
                className="bg-blue-50 border border-blue-100 p-2 rounded"
                type="text"
                name="unit"
                value={form.unit}
                onChange={handleChange}
                placeholder="e.g. Kg, Liter"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="stock">Stock</label>
              <input
                className="bg-blue-50 border border-blue-100 p-2 rounded"
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="price">Price</label>
              <input
                className="bg-blue-50 border border-blue-100 p-2 rounded"
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="discount">Discount (%)</label>
              <input
                className="bg-blue-50 border border-blue-100 p-2 rounded"
                type="number"
                name="discount"
                value={form.discount}
                onChange={handleChange}
              />
            </div>
          </div>

          {Object.entries(form.more_details).map(([key, val], i) => (
            <div key={i} className="grid gap-1">
              <label className="capitalize">{key}</label>
              <input
                type="text"
                value={val}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    more_details: {
                      ...prev.more_details,
                      [key]: e.target.value,
                    },
                  }))
                }
                className="bg-blue-50 border border-blue-100 p-2 rounded"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => setAddField(true)}
            className="border px-3 py-1 rounded w-fit text-sm hover:bg-amber-100"
          >
            + Add Field
          </button>

          <button
            type="submit"
            disabled={loading.submit}
            className={`px-4 py-2 rounded text-neutral-800 font-medium transition ${
              loading.submit
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-amber-400 hover:bg-amber-500 cursor-pointer'
            }`}
          >
            {loading.submit ? 'Updating...' : 'Update Product'}
          </button>
        </form>

        {imageView && <ViewImage url={imageView} close={() => setImageView('')} />}
        {addField && (
          <AddField
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleFieldAdd}
            close={() => setAddField(false)}
          />
        )}
      </div>
    </section>
  );
};

export default EditProduct;
