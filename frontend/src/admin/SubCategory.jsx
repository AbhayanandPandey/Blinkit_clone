import React, { useEffect, useState } from 'react'

const SubCategory = () => {
  return (
    <section>
      <div className="p-2 pl-8 bg-white shadow-md flex items-center justify-between pr-8">
        <h2 className="font-semibold text-lg"> Sub Category</h2>
        <button
          onClick={() => {  }}
          className="text-sm hover:bg-blue-600 hover:text-white cursor-pointer px-3 py-1 rounded shadow border border-neutral-200"
        >
          Add Sub Category
        </button>
      </div>
    </section>
  )
}

export default SubCategory
