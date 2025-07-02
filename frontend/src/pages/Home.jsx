import React, { useState } from 'react';
import banner from '../assets/banner.jpg';
import bannerMobile from '../assets/banner-mobile.jpg';
import { useSelector } from 'react-redux';

function Home() {
  const [loaded, setLoaded] = useState(false);
  const setLoadingCategory = useSelector(state => state.product.setLoadingCategory);

  return (
    <section className="bg-white">
      <div className="w-full mx-auto px-4 py-2 pb-4">

        <div className={`w-full h-auto rounded overflow-hidden bg-blue-100 relative ${!loaded && 'animate-pulse'}`}>
          {/* Desktop Banner */}
          <img
            src={banner}
            alt="banner"
            onLoad={() => setLoaded(true)}
            className={`w-full h-auto hidden sm:block transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Mobile Banner */}
          <img
            src={bannerMobile}
            alt="banner mobile"
            onLoad={() => setLoaded(true)}
            className={`w-full h-auto sm:hidden transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Skeleton Loader */}
          {!loaded && (
            <div className="absolute inset-0 bg-blue-100 animate-pulse" />
          )}
        </div>

        {setLoadingCategory && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {Array(20).fill(null).map((_, i) => (
              <div key={i} className="bg-white rounded shadow p-4 min-h-40 space-y-3 animate-pulse">
                <div className="bg-blue-100 min-h-24 rounded"></div>
                <div className="bg-blue-100 h-6 rounded w-1/2"></div>
                <div className="flex space-x-2">
                  <div className="bg-blue-100 h-6 rounded w-1/4"></div>
                  <div className="bg-blue-100 h-6 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Home;
