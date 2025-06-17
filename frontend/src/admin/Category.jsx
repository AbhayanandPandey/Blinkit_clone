import React, { useState } from 'react'
import UploadCategory from '../components/UploadCategory'

const Category = () => {
  const [openUpload, setOpenUpload] = useState(false)
  return (
    <section className=''>
      <div className='p-2 pl-8  bg-white shadow-md flex items-center justify-between pr-8 ' >
        <h2 className='font-semibold'>Category</h2>
        <button onClick={()=>setOpenUpload(true)} className='text-sm hover:bg-blue-600 hover:text-white cursor-pointer px-3 py-1 rounded shadow-[6px_1px_16px_2px_rgba(0,0,0,0.1)] border border-neutral-200'>Add category</button>
      </div>
      {
        openUpload && (
          <UploadCategory close={()=>setOpenUpload(false)} />
        )
      }
    </section>
  )
}

export default Category
