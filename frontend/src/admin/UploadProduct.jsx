import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import { MdOutlineDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import UploadImage from '../utils/uploadImage';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import AddField from '../components/AddField';
import SuccessAlert from '../utils/SuccessAlert';
import ErrorAlert from '../utils/ErrorAlert';

const UploadProduct = () => {
  const [imageUploading, setImageUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const allCategory = useSelector((state) => state.product.allCategory);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [openAdd, setOpenAdd] = useState(false)
  const [fieldName, setFieldName] = useState('')

  const [data, setData] = useState({
    name: '',
    image: [],
    category: [],
    subCategory: [],
    unit: '',
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
      const response = await UploadImage(file);
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

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({ ...Api.getSubCategories });
      const { data: responseData } = response;

      if (responseData.success) {
        setAllSubCategory(responseData.data || []);
      } else {
        setAllSubCategory([]);
      }
    } catch (error) {
      AxiosToastError(error);
      setAllSubCategory([]);
    }
  };

  const handleSelectSubCategory = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) return;

    const selectedSubCat = allSubCategory.find((sub) => sub._id === selectedId);
    if (!selectedSubCat) return;

    const alreadyExists = data.subCategory.some((sc) => sc._id === selectedSubCat._id);
    if (!alreadyExists) {
      setData((prev) => ({
        ...prev,
        subCategory: [...prev.subCategory, selectedSubCat],
      }));
    }

    e.target.value = '';
  };

  const handleSubmitMore = (e) => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: ""
        }
      }
    })
    setFieldName('')
    setOpenAdd(false)
  }

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !data.name ||
      !data.image.length ||
      !data.category.length ||
      !data.subCategory.length ||
      !data.unit ||
      data.stock === '' ||
      data.price === '' ||
      !data.description
    ) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...data,
        images: data.image,
      };

      const response = await Axios({
        ...Api.uploadProducts,
        data: payload,
      });

      const { data: productData } = response;

      if (productData.success) {
        SuccessAlert(productData.message);
        setData({
          name: '',
          image: [],
          category: [],
          subCategory: [],
          unit: '',
          stock: '',
          price: '',
          discount: '',
          description: '',
          more_details: {},
        });
      } else {
        ErrorAlert(productData.message || 'Something went wrong');
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <div className="p-2 pl-8 bg-white shadow-md flex items-center justify-between pr-8">
        <h2 className="font-semibold text-lg">Upload Product</h2>
      </div>

      <div className="grid p-7">

        <form onSubmit={handleSubmit} className="grid gap-3">
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

          <div className="grid gap-1">
            <label htmlFor="sub-category" className="font-semibold text-gray-700">
              Sub Category
            </label>
            <select
              id="sub-category"
              className="bg-blue-50 outline-none border border-blue-200 w-full p-2 rounded"
              onChange={handleSelectSubCategory}
            >
              <option value="">Select Sub Category</option>
              {allSubCategory.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>

            {data.subCategory.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {data.subCategory.map((sub) => (
                  <span
                    key={sub._id}
                    className="bg-gray-200 text-neutral-800 px-2 py-1 rounded-full flex items-center gap-2 text-sm"
                  >
                    {sub.name}
                    <button
                      type="button"
                      onClick={() =>
                        setData((prev) => ({
                          ...prev,
                          subCategory: prev.subCategory.filter((sc) => sc._id !== sub._id),
                        }))
                      }
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

          <div className="grid gap-1">
            <label htmlFor="unit" className="font-semibold text-gray-700">
              Unit
            </label>
            <input
              type="text"
              id="unit"
              name="unit"
              placeholder="Enter product unit"
              value={data.unit}
              onChange={handleChange}

              className="bg-blue-50 p-2 outline-none border border-blue-200 rounded "

            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="stock" className="font-semibold text-gray-700">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Enter Product stock"
              value={data.stock}
              onChange={handleChange}

              className="bg-blue-50 p-2 outline-none border border-blue-200 rounded [&::-webkit-inner-spin-button]:appearance-none 
               [&::-webkit-outer-spin-button]:appearance-none"
              min="0"
              step="1"
              style={{ MozAppearance: 'textfield' }}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="price" className="font-semibold text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter Product price"
              value={data.price}
              onChange={handleChange}

              className="bg-blue-50 p-2 outline-none border border-blue-200 rounded [&::-webkit-inner-spin-button]:appearance-none 
               [&::-webkit-outer-spin-button]:appearance-none"
              min="0"
              step="1"
              style={{ MozAppearance: 'textfield' }}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="discount" className="font-semibold text-gray-700">
              Discount
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              placeholder="Enter Product discount"
              value={data.discount}
              onChange={handleChange}

              className="bg-blue-50 p-2 outline-none border border-blue-200 rounded [&::-webkit-inner-spin-button]:appearance-none 
               [&::-webkit-outer-spin-button]:appearance-none"
              min="0"
              step="1"
              style={{ MozAppearance: 'textfield' }}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>

          <div>
            {
              Object?.keys(data.more_details)?.map((k, i) => {
                return (
                  <div className="grid">
                    <label htmlFor={k} className="font-semibold text-gray-700">
                      {k}
                    </label>
                    <input
                      type="text"
                      id={k}
                      value={data?.more_details[k]}
                      onChange={(e) => {
                        const value = e.target.value
                        setData((preve) => {
                          return {
                            ...preve,
                            more_details: {
                              ...preve.more_details,
                              [k]: value
                            }
                          }
                        })
                      }}

                      className="bg-blue-50 p-2 outline-none border border-blue-200 rounded"
                      min="0"
                      step="1"
                    />
                  </div>
                )
              })
            }
          </div>

          <div onClick={() => setOpenAdd(true)} className='inline-block hover:bg-amber-400 py-1 px-3 w-39 text-center font-semibold rounded cursor-pointer border border-blue-200 '>
            Add More Fields
          </div>

          <button
            disabled={loading}
            className='bg-amber-300 hover:bg-amber-400 py-2 rounded font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Uploading...' : 'Submit'}
          </button>

        </form>
        {
          openAdd && (
            <AddField
              close={() => setOpenAdd(false)}
              value={fieldName}
              onChange={(e) => {
                setFieldName(e.target.value)
              }}
              submit={handleSubmitMore}
            />
          )
        }
      </div>
    </section>
  );
};

export default UploadProduct;
