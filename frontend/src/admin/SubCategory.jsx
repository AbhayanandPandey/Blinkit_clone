import React, { useEffect, useState } from 'react'
import UploadSubCategory from '../components/UploadSubCategory'

const SubCategory = () => {
  const [openAddSub , setOpenAddSub]= useState(false)

  return (
    <section>
      <div className="p-2 pl-8 bg-white shadow-md flex items-center justify-between pr-8">
        <h2 className="font-semibold text-lg"> Sub Category</h2>
        <button
          onClick={()=>setOpenAddSub(true)}
          className="text-sm hover:bg-blue-600 hover:text-white cursor-pointer px-3 py-1 rounded shadow border border-neutral-200"
        >
          Add Sub Category
        </button>
      </div>
      {
        openAddSub && (
          <UploadSubCategory close={()=>setOpenAddSub(false)} />
        )
      }
    </section>
  )
}

export default SubCategory
