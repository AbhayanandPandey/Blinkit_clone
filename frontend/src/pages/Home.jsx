import React, { useState } from 'react';
import banner from '../assets/banner.jpg';
import bannerMobile from '../assets/banner-mobile.jpg';
import { useSelector } from 'react-redux';
import useScreenSize from '../hooks/useScreenSize';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [loaded, setLoaded] = useState(false);
  const loadingCategory = useSelector(state => state.product.setLoadingCategory);
  const CategoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.subcategory);
  const navigate = useNavigate();

  const handleRedirectProduct = (categoryId, categoryName) => {
    const subcate = subCategoryData.find(sub =>
      sub.category?.some(c => c._id === categoryId)
    );

    if (!subcate) return;

    const formatSlug = str =>
      str.toLowerCase().replace(/&|,/g, '').replace(/\s+/g, '-');

    const categorySlug = `${formatSlug(categoryName)}-${categoryId}`;
    const subcategorySlug = `${formatSlug(subcate.name)}-${subcate._id}`;

    navigate(`/${categorySlug}/${subcategorySlug}`);
  };

  const screenSize = useScreenSize();
  let skeletonCount = screenSize === 'tablet' ? 16 : screenSize === 'mobile' ? 10 : 18;

  return (
    <section className="bg-white">
      <div className="w-full mx-auto px-4 py-2 pb-4">
        <div className={`w-full h-auto rounded overflow-hidden bg-blue-100 relative ${!loaded && 'animate-pulse'}`}>
          <img
            src={banner}
            alt="banner"
            onLoad={() => setLoaded(true)}
            className={`w-full h-auto hidden sm:block transition-opacity duration-500 cursor-pointer ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <img
            src={bannerMobile}
            alt="banner mobile"
            onLoad={() => setLoaded(true)}
            className={`w-full h-auto sm:hidden transition-opacity duration-500 cursor-pointer ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
          {!loaded && <div className="absolute inset-0 bg-blue-100 animate-pulse" />}
        </div>

        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 mt-6 gap-4">
          {loadingCategory ? (
            Array(skeletonCount).fill(null).map((_, i) => (
              <div key={i} className="bg-white rounded p-4 min-h-36 animate-pulse grid shadow gap-2">
                <div className="bg-blue-100 min-h-24 rounded"></div>
                <div className="bg-blue-100 h-8 rounded"></div>
              </div>
            ))
          ) : (
            CategoryData.map((c, i) => (
              <div
                key={c._id || i}
                className="bg-white rounded min-h-36 shadow grid gap-2 cursor-pointer"
                onClick={() => handleRedirectProduct(c._id, c.name)}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-scale-down"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
