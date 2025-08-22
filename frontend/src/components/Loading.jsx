import React, { useEffect, useState } from "react";

const Loading = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Hide after 1 second
    const timer = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null; // Don't render after 1s

  return (
    <section className="fixed inset-0 bg-black/50 backdrop-blur-[3px] flex items-center justify-center z-50">
      <div className="rounded w-full relative">
        <div className="flex justify-center p-5 items-center">
          <div className="spinner flex gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-slate-700 animate-spin"></div>
            <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-green-500 animate-spin"></div>
            <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-gray-700 animate-spin"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
