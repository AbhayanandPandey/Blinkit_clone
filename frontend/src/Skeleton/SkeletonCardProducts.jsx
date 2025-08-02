import React from 'react';

const SkeletonCardProduct = () => {
  return (
    <div className="lg:w-36 w-40 h-[290px] bg-white rounded shadow-md flex flex-col justify-between animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-40 bg-gray-200 rounded-t" />

      <div className="px-2 py-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>

      <div className="flex justify-between items-center px-3 py-1">
        <div className="w-8 h-6 bg-gray-200 rounded" />
        <div className="w-8 h-6 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default SkeletonCardProduct;
