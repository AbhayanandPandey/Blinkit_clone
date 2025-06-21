import React from 'react'

const SkeletonCardForSubCategory = () => {
  return (
    <div className="w-full animate-pulse flex items-center justify-between border-b py-3 px-2">
      <div className="w-1/4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
      <div className="w-1/4 flex justify-center">
        <div className="w-12 h-12 bg-gray-200 rounded"></div>
      </div>
      <div className="w-1/4">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
      {/* Actions */}
      <div className="w-1/4 flex justify-center gap-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  )
}

export default SkeletonCardForSubCategory
