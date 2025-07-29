import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import { MdDelete } from 'react-icons/md';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import uploadImage from '../utils/uploadImages';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import ViewImage from '../components/ViewImage';
import AddField from '../components/AddField';
import SuccessAlert from '../utils/SuccessAlert';

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
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setLoading(prev => ({ ...prev, upload: true }));
            const response = await uploadImage(file);
            const { data: imgRes } = response;

            if (imgRes?.success) {
                setForm(prev => ({ ...prev, image: [...prev.image, imgRes.data.url] }));
                toast.success('Image uploaded');
            } else {
                toast.error(imgRes?.message || 'Failed to upload image');
            }
        } catch (err) {
            toast.error('Image upload failed');
        } finally {
            setLoading(prev => ({ ...prev, upload: false }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(prev => ({ ...prev, submit: true }));
            const response = await Axios({
                ...Api.updateProduct,
                data: {
                    productId: form._id,
                    ...form,
                },
            });

            const { data: resData } = response;
            if (resData.success) {
                SuccessAlert(resData.message)
                fetchData();
                close();
            } else {
                toast.error(resData.message || 'Update failed');
            }
        } catch (err) {
            AxiosToastError(err);
        } finally {
            setLoading(prev => ({ ...prev, submit: false }));
        }
    };

    const removeImage = (index) => {
        const newImages = [...form.image];
        newImages.splice(index, 1);
        setForm(prev => ({ ...prev, image: newImages }));
    };

    const handleFieldAdd = () => {
        if (fieldName.trim()) {
            setForm(prev => ({
                ...prev,
                more_details: {
                    ...prev.more_details,
                    [fieldName]: ''
                }
            }));
            setFieldName('');
            setAddField(false);
        }
    };

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
                            className="w-full p-2 border border-blue-200 outline-none  bg-blue-50 rounded"
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
                            className="w-full p-2 border border-blue-200 outline-none  bg-blue-50 rounded resize-none"
                        />
                    </div>

                    <div className="grid gap-1">
                        <p className="mb-0 font-semibold text-gray-700">Images</p>
                        <label
                            htmlFor="image"
                            className="bg-blue-50 h-28 border-2 border-dashed border-blue-300 rounded-lg flex justify-center items-center cursor-pointer hover:bg-blue-100 transition-all duration-200"
                        >
                            <div className="text-center flex flex-col items-center justify-center text-blue-500">
                                {loading.upload ? (
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
                                onChange={handleImageUpload}
                            />
                        </label>

                        {form.image.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-4">
                                {form.image.map((img, i) => (
                                    <div
                                        key={img + i}
                                        className="relative h-24 w-24 border border-gray-200 rounded-md overflow-hidden group"
                                    >
                                        <img
                                            src={img}
                                            alt={`img-${i}`}
                                            className="w-full h-full object-scale-down"
                                            onClick={() => setImageView(img)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute bottom-0 cursor-pointer right-1 bg-white rounded-full p-1 text-red-600 hover:text-red-800 group-hover:opacity-100 opacity-0 transition-all"
                                            title="Remove"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    

                    {/* FORM FIELDS */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="font-medium">Unit</label>
                            <input
                                type="text"
                                name="unit"
                                value={form.unit}
                                onChange={handleChange}
                                placeholder="e.g. Kg, Liter"
                                className="w-full p-2 border border-blue-200 outline-none  bg-blue-50 rounded"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                className="w-full p-2 border border-blue-200 outline-none  bg-blue-50 rounded"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                className="w-full p-2 border border-blue-200 outline-none  bg-blue-50 rounded"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Discount (%)</label>
                            <input
                                type="number"
                                name="discount"
                                value={form.discount}
                                onChange={handleChange}
                                className="w-full p-2 border border-blue-200 outline-none  bg-blue-50 rounded"
                            />
                        </div>
                    </div>

                    {/* MORE DETAILS */}
                    {Object.entries(form.more_details).map(([key, val], i) => (
                        <div key={i}>
                            <label className="font-medium capitalize">{key}</label>
                            <input
                                type="text"
                                value={val}
                                onChange={(e) =>
                                    setForm(prev => ({
                                        ...prev,
                                        more_details: {
                                            ...prev.more_details,
                                            [key]: e.target.value,
                                        },
                                    }))
                                }
                                className="w-full p-2 border border-blue-200 outline-none  bg-blue-50 rounded"
                            />
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => setAddField(true)}
                        className='inline-block hover:bg-amber-400 py-1 px-3 w-39 text-center font-semibold rounded cursor-pointer border border-blue-200 outline-none '>
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
