import React from 'react';

const CardProductSkeleton = () => {
  return (
    <div className="border border-gray-200 p-3 rounded-lg shadow-sm animate-pulse lg:min-w-50 md:min-w-46 min-w-46 max-w-53 w-full bg-white">
      <div className="w-full h-28 lg:h-34 md:h-32 rounded bg-gray-200"></div>

      <div className="h-4 w-16 mt-3 rounded bg-gray-100"></div>

      <div className="h-4 mt-2 rounded bg-gray-300 w-3/4"></div>

      <div className="h-4 mt-2 rounded bg-gray-200 w-1/2"></div>

      <div className="mt-3 flex items-center justify-between">
        <div className="h-4 rounded bg-gray-300 w-16"></div>
        <div className="h-7 rounded bg-gray-300 w-16"></div>
      </div>
    </div>
  );
};

export default CardProductSkeleton;
