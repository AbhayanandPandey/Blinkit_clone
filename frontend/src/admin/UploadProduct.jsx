import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import UplaodImage from '../utils/uploadImage'

const UploadProduct = () => {
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
    const file = e.target.files[0]
    if (!file) {
      return
    }
    const response = await UplaodImage(file);
    const { data: ImageResponse } = response;
    setData((prev) => ({
      ...prev,
      image: ImageResponse.data.url
    }));
  }
  return (
    <section className="">
      <div className="p-2 pl-8 bg-white shadow-md flex items-center justify-between pr-8">
        <h2 className="font-semibold text-lg">Upload Product</h2>
      </div>
      <div className='grid p-4'>
        <form className='grid gap-2'>
          <div className='grid gap-1'>
            <label htmlFor="name">Name</label>
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
            <label htmlFor="description">Description</label>
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
          <div>
            <p>Image</p>
            <div>
              <label htmlFor='image' className='bg-blue-50 h-24 border border-blue-200 rounded flex justify-center items-center cursor-pointer'>
                <div className='text-center flex justify-center items-center flex-col'>
                  <FaCloudUploadAlt size={26} />
                  <p>upload image</p>
                  <input type="file" id='image' className='hidden' accept='image/*' onChange={handleUploadImage} />
                </div>
              </label>

            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default UploadProduct
