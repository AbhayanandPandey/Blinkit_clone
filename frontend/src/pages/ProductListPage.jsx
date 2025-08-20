import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';
import CardProductSkeleton from '../Skeleton/CardProductSkeletons';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [displaySub, setDisplaySub] = useState([]);

  const params = useParams();
  const allSubcategories = useSelector((state) => state.product.subcategory);

  const categoryId = params.category.split('-').slice(-1)[0];
  const subCategoryId = params.subcategory.split('-').slice(-1)[0];

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...Api.getProductsByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: 20,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (page === 1) {
          setData(responseData.data);
        } else {
          setData((prev) => [...prev, ...responseData.data]);
        }
        setTotalPage(responseData.totalPages);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setData([]);
  }, [params]);

  useEffect(() => {
    fetchProductData();
  }, [page, params]);

  useEffect(() => {
    const subCategoryData = allSubcategories.filter((s) =>
      s.category.some((el) => el._id === categoryId)
    );
    setDisplaySub(subCategoryData);
  }, [params, allSubcategories]);

  return (
    <section className="bg-white pb-4 lg:py-2">
      <div className="max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-4 py-3 pt-0 lg:pt-3 md:min-h-[86vh] lg:max-w-screen-xl">
        <div className="text-sm md:text-[16px] lg:text-[18px] mb-2 text-gray-700 ml-2 lg:ml-0">
          <Link to="/" className="hover:text-blue-600 font-medium transition">Home</Link>
          <span className="mx-1">/</span>
          <span className="capitalize">{params.category.split('-').slice(0, -1).join(' ')}</span>
        </div>

        <div className="grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] gap-3 sm:gap-4">
          <aside className="custom-scroll min-h-[78vh] max-h-[calc(84vh-0px)] overflow-y-auto bg-white p-2 sm:p-4 border-r border-l border-gray-200 sticky top-24">
            <div className="flex flex-col items-center px-0 md:px-2 lg:px-4 gap-3">
              {displaySub.map((s, i) => {
                const formatSlug = (str) =>
                  str.toLowerCase().replace(/&|,/g, '').replace(/\s+/g, '-');

                const categoryName = s.category[0]?.name || '';
                const subCategoryName = s.name || '';
                const categoryId = s.category[0]?._id || '';
                const subCategoryIdItem = s._id;

                const link = `/${formatSlug(categoryName)}-${categoryId}/${formatSlug(subCategoryName)}-${subCategoryIdItem}`;

                return (
                  <Link
                    to={link}
                    key={i}
                    className={`w-full bg-gray-100 rounded shadow flex flex-col items-center p-2 cursor-pointer hover:bg-green-100 transition ${subCategoryId === subCategoryIdItem ? 'bg-green-100' : ''
                      }`}
                  >
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-16 md:w-18 lg:w-18 h-full object-contain pt-3 mb-2"
                    />
                    <p className="text-center text-xs font-medium -mt-1 text-gray-700">
                      {s.name}
                    </p>
                  </Link>
                );
              })}
            </div>

          </aside>

          <main className="min-h-[78vh]">
            <div className="bg-white shadow-md rounded md:py-3 py-2 mb-4 flex justify-between items-center md:px-6 px-2">
              <h3 className="font-semibold md:text-xl text-gray-800 capitalize">
                {params.subcategory.split('-').slice(0, -1).join(' ')}
              </h3>
            </div>

            <div className="p-2 grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-2 three-cols-900 lg:grid-cols-4 gap-3 sm:gap-4">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                  <CardProductSkeleton key={i} />
                ))
                : data.map((product, i) => (
                  <CardProduct key={product._id || i} data={product} />
                ))}
            </div>

            {!loading && page < totalPage && (
              <div className="flex justify-center my-6">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base px-5 py-2 rounded-md shadow transition"
                >
                  Load More
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
