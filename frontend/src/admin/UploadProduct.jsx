import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import UplaodImage from '../utils/uploadImage'
import { ImSpinner8 } from 'react-icons/im'
const UploadProduct = () => {
  const [imageUploading, setImageUploading] = useState(false);

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
    // publish:true,
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setImageUploading(true);
      const response = await UplaodImage(file);
      const { data: ImageResponse } = response;
      const imageUrl = ImageResponse.data.url;

      setData((prev) => ({
        ...prev,
        image: [...prev.image, imageUrl],
      }));
    } catch (err) {
      toast.error("Failed to upload image");
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

  return (
    <section className="">
      <div className="p-2 pl-8 bg-white shadow-md flex items-center justify-between pr-8">
        <h2 className="font-semibold text-lg">Upload Product</h2>
      </div>
      <div className='grid p-4'>
        <form className='grid gap-2'>
          <div className='grid gap-1'>
            <label htmlFor="name" className=' font-semibold text-gray-700'>Name</label>
            <input
              type="text"
              id='name'
              name='name'
              placeholder='Enter Product name'
              value={data.name}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border border-blue-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor="description" className='font-semibold text-gray-700'>Description</label>
            <textarea
              type="text"
              id='description'
              name='description'
              placeholder='Enter Product description'
              value={data.description}
              onChange={handleChange}
              required
              rows={3}
              className='bg-blue-50 p-2 outline-none border border-blue-200 rounded resize-none'
            />
          </div>
          <div className="mb-4">
            <p className="mb-2 font-semibold text-gray-700">Images</p>

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
                      className="absolute bottom-0 cursor-pointer right-0 bg-transparent rounded-full p-1 shadow group-hover:opacity-100 opacity-0 transition-all"
                      title="Remove"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </form>
      </div>
    </section>
  )
}

export default UploadProduct
