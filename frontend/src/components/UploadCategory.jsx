import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import UplaodImage from '../utils/uploadImage'
import toast from 'react-hot-toast'

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

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const handleUplaod= async(e)=>{
    const file = e.target.files[0]
    if(!file){
      return
    }
    const Img = await UplaodImage(file);
    console.log('res',Img)
    if(Img.data.error){
      toast.error(Img.data.message)
    }
    if(Img.data.success){
      toast.success(Img.data.message)
    }

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
        <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
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
          <div className='grid gap-1'>
            <p>Image</p>
            <div className='flex gap-3 flex-col lg:flex-row items-center'>
              <div className='border bg-blue-50 border-blue-100 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                <p className='text-sm text-neutral-500'>
                  No image
                </p>
              </div>
              <label htmlFor="uploadImage">
                <div
                  className={`${!data.name ? 'bg-gray-200 cursor-not-allowed' : 'bg-amber-500 cursor-pointer '} px-4 py-2 rounded`}>
                  upload Image
                </div>
                <input disabled={!data.name} onChange={ handleUplaod} type="file" name="" id="uploadImage"  className='hidden'/>
              </label>

            </div>
          </div>
        </form>
      </div >
    </section >
  )
}

export default UploadCategory
