import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const params = useParams();
  const categoryId = params.category.split('-').slice(-1)[0];
  const subCategoryId = params.subcategory.split('-').slice(-1)[0];

  const fetchProductData = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...Api.getProductsByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
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

  return (
    <section className="bg-white py-2 pb-4 lg:py-8 ">
      <div className="max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-4">
        <div className="grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] gap-3 sm:gap-4 min-h-[76vh] ">
          <aside className="min-h-[20vh] bg-gray-100 p-2 sm:p-4 shadow-sm">
            <div className="text-xs sm:text-sm text-gray-600">Sidebar</div>
          </aside>

          <main >
            <div className="bg-white shadow-md rounded py-3 px-2 mb-4">
              <h3 className="font-semibold text-xl sm:text-xl text-gray-800 capitalize">
                {params.subcategory.split('-').slice(0, -1).join(' ')}
              </h3>
            </div>

            <div className="p-2 grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-2 three-cols-900 lg:grid-cols-4 gap-3 sm:gap-4">
              {data.map((product, i) => (
                <CardProduct key={product._id || i} data={product} />
              ))}
            </div>

            {loading && (
              <div className="flex justify-center my-4">
                <Loading />
              </div>
            )}

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
