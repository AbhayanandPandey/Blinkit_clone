import React, { useEffect, useState } from 'react';

const loading = () => {

  return (
    <section className="fixed inset-0 backdrop-blur-[.3px] opacity-[.9] flex items-center justify-center z-50">
      <div className=" rounded w-full relative">
        <div className="flex justify-center p-5 items-center">
          <div className="spinner flex gap-4">
            <div className="w-6 h-6 rounded-full border-4 border-t-transparent border-white animate-spin"></div>
            <div className="w-6 h-6 rounded-full border-4 border-t-transparent border-gray-300 animate-spin"></div>
            <div className="w-6 h-6 rounded-full border-4 border-t-transparent border-gray-500 animate-spin"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default loading;
