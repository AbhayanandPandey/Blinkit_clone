import React from 'react';

const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] gap-3 sm:gap-4">
      {/* Main Product Skeletons */}
      <main className="min-h-[78vh]">
        <div className="bg-white shadow-md rounded md:py-3 py-2 mb-4 px-4 h-10 w-1/2 animate-pulse " />
        <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-full h-60 bg-gray-100 animate-pulse rounded shadow p-2 flex flex-col"
            >
              <div className="bg-gray-300 h-32 mb-3 rounded" />
              <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded" />
              <div className="bg-gray-300 h-4 w-1/2 rounded" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListSkeleton;
