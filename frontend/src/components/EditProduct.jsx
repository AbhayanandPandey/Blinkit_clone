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
        subCategory: [],
    });

    const [loading, setLoading] = useState({ upload: false, submit: false });
    const [imageView, setImageView] = useState('');
    const [addField, setAddField] = useState(false);
    const [fieldName, setFieldName] = useState('');

    useEffect(() => {
        const shouldHydrate =
            Array.isArray(productData.subCategory) &&
            productData.subCategory.length > 0 &&
            allSubCategoryData.length > 0 &&
            form.subCategory.length === 0;

        if (shouldHydrate) {
            const hydrated = productData.subCategory
                .map((item) =>
                    typeof item === 'object' ? item : allSubCategoryData.find((sub) => sub._id === item)
                )
                .filter(Boolean);

            setForm((prev) => ({ ...prev, subCategory: hydrated }));
        }
    }, [productData, allSubCategoryData]);

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
                subCategory: form.subCategory.map((s) => s._id),
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
                            rows="3"
                            required
                            className="w-full p-2 border border-blue-200 outline-none bg-blue-50 rounded resize-none"
                        />
                    </div>

                    <div className="grid gap-1">
                        <label className="font-semibold">Images</label>
                        <label htmlFor="image" className="bg-blue-50 h-28 border-2 border-dashed border-blue-300 rounded-lg flex justify-center items-center cursor-pointer hover:bg-blue-100 transition-all duration-200">
                            <div className="text-center text-blue-500">
                                {loading.upload ? (
                                    <ImSpinner8 className="animate-spin mx-auto" size={26} />
                                ) : (
                                    <>
                                        <FaCloudUploadAlt size={30} className="mx-auto" />
                                        <p className="text-sm">Click to upload</p>
                                    </>
                                )}
                            </div>
                            <input type="file" id="image" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>

                        {form.image?.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-4">
                                {form.image.map((img, i) => (
                                    <div key={i} className="relative h-24 w-24 border rounded-md overflow-hidden group">
                                        <img src={img} alt={`img-${i}`} className="w-full h-full object-scale-down" onClick={() => setImageView(img)} />
                                        <button type="button" onClick={() => removeImage(i)} className="absolute bottom-0 right-1 bg-white rounded-full p-1 text-red-600 hover:text-red-800 group-hover:opacity-100 opacity-0 transition-all" title="Remove">
                                            &times;
                                        </button>
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
                                        subCategory: [],
                                    }));
                                }}
                            >
                                <option value="" disabled>
                                    -- Select Category --
                                </option>
                                {allcategoryData.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="font-medium">Subcategory</label>
                            <div className="border border-blue-200 rounded">
                                <div className="flex flex-wrap gap-2 p-2">
                                    {form.subCategory.map((sub) => (
                                        <p key={sub._id} className="bg-white shadow px-2 py-1 flex items-center gap-2 rounded text-sm">
                                            {sub.name}
                                            <span
                                                className="cursor-pointer hover:text-red-600"
                                                onClick={() =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        subCategory: prev.subCategory.filter((el) => el._id !== sub._id),
                                                    }))
                                                }
                                            >
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
                                        const subCatObj = allSubCategoryData.find((el) => el._id === value);
                                        if (subCatObj && !form.subCategory.some((sub) => sub._id === value)) {
                                            setForm((prev) => ({
                                                ...prev,
                                                subCategory: [...prev.subCategory, subCatObj],
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
                                                : [typeof sub.category === 'object' ? sub.category._id : sub.category];

                                            const matchesCategory = catIds.some((catId) =>
                                                form.category.includes(catId)
                                            );

                                            const alreadySelected = form.subCategory.some((s) => s._id === sub._id);

                                            return matchesCategory && !alreadySelected;
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
