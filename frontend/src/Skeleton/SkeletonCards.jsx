import React from 'react'

const SkeletonCard = () => {
  return (
    <div className="w-32 h-56 bg-gray-100 rounded shadow-md animate-pulse flex flex-col justify-between">
      <div className="bg-gray-300 h-40 w-full rounded-t" />
      <div className="flex justify-between px-4 py-2">
        <div className="w-6 h-6 bg-gray-300 rounded" />
        <div className="w-6 h-6 bg-gray-300 rounded" />
      </div>
    </div>
  )
}

export default SkeletonCard
