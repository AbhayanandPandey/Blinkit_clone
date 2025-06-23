import React, { useState } from 'react'
import SubCategory from './SubCategory'

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
            <label htmlFor="decription">Decription</label>
            <input
              type="text"
              id='decription'
              name='decription'
              placeholder='Enter Product decription'
              value={data.decription}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border border-blue-200 rounded'
            />
          </div>
        </form>
      </div>
    </section>
  )
}

export default UploadProduct
