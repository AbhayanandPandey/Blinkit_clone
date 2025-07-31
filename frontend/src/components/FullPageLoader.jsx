import React from 'react';

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-tr from-green-100 via-white to-green-200 transition-opacity duration-700">
      {/* Ripple Loader */}
      <div className="relative mb-6">
        <div className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-green-400 opacity-75"></div>
        <div className="relative inline-flex rounded-full h-16 w-16 bg-green-500 text-white font-bold text-xl items-center justify-center shadow-xl">
          B
        </div>
      </div>

      {/* Brand Name with Typing/Blinking Cursor Effect */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-green-700 flex items-center">
        Loading&nbsp;<span className="text-black font-bold">Blinkyt</span>
        <span className="ml-1 w-1.5 h-6 bg-black animate-blink"></span>
      </h1>

      {/* Optional: Add subtle message */}
      <p className="mt-2 text-sm text-gray-600">Bringing groceries to your door...</p>

      {/* Custom animation class for blinking cursor */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </div>
  );
};

export default FullPageLoader;
