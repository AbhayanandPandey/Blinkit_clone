import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'

const UploadCategory = ({ close }) => {
  const [data, setData] = useState({
    name: '',
    image: ''
  })
  const handleOnchange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  return (
    <section className=' px-3 lg:px-0
    
    fixed top-0 left-0 right-0 bottom-0 bg-neutral-800 opacity-90 z-11 flex items-center justify-center'>
      <div className='bg-white overflow-hidden rounded max-w-4xl p-4 w-full '>
        <div className="flex items-center justify-between">
          <h2 className='font-semibold'>category</h2>
          <button onClick={close} className=' w-fit block cursor-pointer ml-auto'>
            <IoClose size={22} />
          </button>
        </div>
        <form action="my-3">
          <div className='grid gap-1 py-2'>
            <label htmlFor="categoryName">Name</label>
            <input
              type="text"
              name="name"
              id="categoryName"
              value={data.value}
              placeholder='Enter category name'
              onChange={handleOnchange}
              className='bg-blue-50 border border-blue-100 p-2 focus-within:border-blue-300 outline-none rounded'
            />
          </div>
          <div>
            <p>Image</p>
            <div>
              
           </div>
      </div>
    </form> 
      </div >
    </section >
  )
}

export default UploadCategory
