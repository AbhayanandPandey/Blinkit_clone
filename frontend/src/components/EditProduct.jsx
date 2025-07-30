import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import uploadImage from '../utils/uploadImages';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import ViewImage from '../components/ViewImage';
import AddField from '../components/AddField';
import SuccessAlert from '../utils/SuccessAlert';
import { useSelector } from 'react-redux';

const EditProduct = ({ data: productData, close, fetchData }) => {
    const allcategoryData = useSelector((state) => state.product.allCategory);
    const allSubCategoryData = useSelector((state) => state.product.subcategory);

    const [form, setForm] = useState({
        ...productData,
        image: productData.image || [],
        more_details: productData.more_details || {},
        sub_category: [],
    });

    const [loading, setLoading] = useState({ upload: false, submit: false });
    const [imageView, setImageView] = useState('');
    const [addField, setAddField] = useState(false);
    const [fieldName, setFieldName] = useState('');

    useEffect(() => {
        if (
            Array.isArray(productData.sub_category) &&
            allSubCategoryData.length > 0
        ) {
            const preSelected = productData.sub_category
                .map((id) => allSubCategoryData.find((sub) => sub._id === id))
                .filter(Boolean);
            setForm((prev) => ({ ...prev, sub_category: preSelected }));
        }
    }, [allSubCategoryData, productData.sub_category]);

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
                setForm((prev) => ({ ...prev, image: [...prev.image, imgRes.data.url] }));
                toast.success('Image uploaded');
            } else {
                toast.error(imgRes?.message || 'Failed to upload image');
            }
        } catch (err) {
            toast.error('Image upload failed');
        } finally {
            setLoading((prev) => ({ ...prev, upload: false }));
        }
    };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading((prev) => ({ ...prev, submit: true }));
    const payload = {
        productId: form._id,
        ...form,
        sub_category: form.sub_category.map(s => s._id)
      };
      const { data } = await Axios({ ...Api.updateProduct, data: payload });
      if (data.success) {
        SuccessAlert(data.message);
        fetchData();
        close();
      } else {
        toast.error(data.message);
      }
  } catch (err) {
    AxiosToastError(err);
  } finally {
    setLoading((prev) => ({ ...prev, submit: false }));
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
    useEffect(() => {
  if (
    Array.isArray(productData.sub_category) &&
    productData.sub_category.length > 0 &&
    allSubCategoryData.length > 0
  ) {
    const hydratedSubs = productData.sub_category
      .map((id) => allSubCategoryData.find((sub) => sub._id === id))
      .filter(Boolean); // Remove undefined

    setForm((prev) => ({
      ...prev,
      sub_category: hydratedSubs,
    }));
  }
}, [allSubCategoryData, productData.sub_category]);



    return (
        <section className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg p-6 w-full max-w-5xl relative max-h-[95vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Edit Product</h2>
                    <button onClick={close} className="text-gray-700 hover:text-black cursor-pointer">
                        <IoClose size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div>
                        <label className="font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Product name"
                            required
                            className="w-full p-2 border border-blue-200 outline-none bg-blue-50 rounded"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Product description"
                            rows="3"
                            required
                            className="w-full p-2 border border-blue-200 outline-none bg-blue-50 rounded resize-none"
                        />
                    </div>

                    <div className="grid gap-1">
                        <p className="mb-0 font-semibold text-gray-700">Images</p>
                        <label htmlFor="image" className="bg-blue-50 h-28 border-2 border-dashed border-blue-300 rounded-lg flex justify-center items-center cursor-pointer hover:bg-blue-100 transition-all duration-200">
                            <div className="text-center flex flex-col items-center justify-center text-blue-500">
                                {loading.upload ? <ImSpinner8 className="animate-spin" size={26} /> : <><FaCloudUploadAlt size={30} /><p className="text-sm mt-1">Click to upload</p></>}
                            </div>
                            <input type="file" id="image" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>

                        {Array.isArray(form.image) && form.image.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-4">
                                {form.image.map((img, i) => (
                                    <div key={img + i} className="relative h-24 w-24 border border-gray-200 rounded-md overflow-hidden group">
                                        <img src={img} alt={`img-${i}`} className="w-full h-full object-scale-down" onClick={() => setImageView(img)} />
                                        <button type="button" onClick={() => removeImage(i)} className="absolute bottom-0 cursor-pointer right-1 bg-white rounded-full p-1 text-red-600 hover:text-red-800 group-hover:opacity-100 opacity-0 transition-all" title="Remove">&times;</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="font-medium">Category</label>
                            <select
                                className="w-full p-2 border border-blue-200 outline-none bg-blue-50 rounded"
                                value={form.category || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setForm((prev) => ({
                                        ...prev,
                                        category: value,
                                        sub_category: [],
                                    }));
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

                        <div className="grid gap-1">
                            <label className="font-medium">Select Sub Category</label>
                            <div className="border border-blue-200 rounded">
                                {/* Selected Subcategories as Chips */}
                                <div className="flex flex-wrap gap-2 p-2">
                                    {form.sub_category.map((sub) => (
                                        <p
                                            key={sub._id}
                                            className="bg-white shadow-md px-2 py-1 flex items-center gap-2 rounded text-sm"
                                        >
                                            {sub.name}
                                            <span
                                                onClick={() =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        sub_category: prev.sub_category.filter((el) => el._id !== sub._id),
                                                    }))
                                                }
                                                className="hover:text-red-600 cursor-pointer"
                                            >
                                                <IoClose size={16} />
                                            </span>
                                        </p>
                                    ))}
                                </div>

                                {/* Subcategory Dropdown */}
                                <select
                                    className="w-full bg-transparent py-2 rounded px-4 outline-none border-t border-blue-100"
                                    vlue=""
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const subCatObj = allSubCategoryData.find((el) => el._id === value);
                                        if (subCatObj && !form.sub_category.some((sub) => sub._id === value)) {
                                            setForm((prev) => ({
                                                ...prev,
                                                sub_category: [...prev.sub_category, subCatObj],
                                            }));
                                        }
                                    }}
                                    disabled={!form.category || form.category.length === 0}
                                >
                                    <option value="" disabled>
                                        -- Select Sub Category --
                                    </option>
                                    {allSubCategoryData
                                        .filter((sub) => {
                                            const catIds = Array.isArray(sub.category)
                                                ? sub.category.map((c) => (typeof c === 'object' ? c._id : c))
                                                : [sub.category];

                                            return catIds.some((catId) => form.category.includes(String(catId))) &&
                                                !form.sub_category.some((s) => s._id === sub._id);
                                        })
                                        .map((sub) => (
                                            <option key={sub._id} value={sub._id}>
                                                {sub.name}
                                            </option>
                                        ))}
                                </select>

                            </div>
                        </div>


                        <div>
                            <label className="font-medium">Unit</label>
                            <input
                                type="text"
                                name="unit"
                                value={form.unit}
                                onChange={handleChange}
                                placeholder="e.g. Kg, Liter"
                                className="w-full p-2 border border-blue-200 outline-none bg-blue-50 rounded"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                className="w-full p-2 border border-blue-200 outline-none bg-blue-50 rounded"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                className="w-full p-2 border border-blue-200 outline-none bg-blue-50 rounded"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Discount (%)</label>
                            <input
                                type="number"
                                name="discount"
                                value={form.discount}
                                onChange={handleChange}
                                className="w-full p-2 border border-blue-200 outline-none bg-blue-50 rounded"
                            />
                        </div>
                    </div>

                    {Object.entries(form.more_details).map(([key, val], i) => (
                        <div key={i}>
                            <label className="font-medium capitalize">{key}</label>
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
                                className="w-full p-2 border border-blue-200 outline-none bg-blue-50 rounded"
                            />
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => setAddField(true)}
                        className="inline-block hover:bg-amber-400 py-1 px-3 w-39 text-center font-semibold rounded cursor-pointer border border-blue-200 outline-none"
                    >
                        Add More Fields
                    </button>

                    <button
                        type="submit"
                        disabled={loading.submit}
                        className="bg-amber-400 hover:bg-amber-500 text-white font-medium py-2 px-4 rounded disabled:bg-gray-300 cursor-pointer"
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