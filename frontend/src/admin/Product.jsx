import React, { useEffect, useState } from 'react';
import AxiosToastError from '../utils/AxiosToastError';
import Api from '../config/Api';
import Axios from '../utils/Axios';
import SkeletonCardProduct from '../components/SkeletonCardProduct';
import ProductCardAdmin from '../components/ProductCardAdmin';
import NoData from '../components/NoData';
import ConfirmDelete from '../components/ConfirmDelete';
import EditProduct from '../components/EditProduct';
import toast from 'react-hot-toast';
import useDebounce from '../utils/useDebounce'; 
import { CiSearch } from "react-icons/ci";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400);


  const fetchProductData = async (searchTerm = '') => {
    try {
      setLoading(true);

      const response = await Axios({
        ...Api.getProducts,
        data: {
          page,
          limit: 10,
          search: searchTerm
        },
      });

      const { data: ProductResponse } = response;
      if (ProductResponse.success) {
        setProductData(ProductResponse.data || []);
        setTotalPages(ProductResponse.totalPages || 1);
      } else {
        setProductData([]);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...Api.deleteProduct,
        data: { productId: deleteProductId },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchProductData();
        setOpenDelete(false);
        setDeleteProductId(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    const cleaned = debouncedSearch.trim();

    if (cleaned === '' || cleaned.length > 1) {
      fetchProductData(cleaned);
    }
  }, [page, debouncedSearch]);


  const handleOnChange = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }

  return (
    <section>
      <div className="p-2 pl-8 bg-white shadow-md flex items-center justify-between pr-8 gap-4">
        <div>
          <h2 className="font-semibold text-lg">Products</h2>
        </div>
        <div className='h-full px-2 py-2 bg-blue-50 rounded flex border border-blue-200 focus-within:border-blue-400'>
          <CiSearch size={23} />
          <input type="text"
            placeholder='Search products ...'
            className='px-1 py-0 outline-none'
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>
 
      <div className="py-8 px-7 w-full grid lg:grid-cols-5 md:grid-cols-3  grid-cols-2 gap-4 gap-y-6 place-items-center min-h-[400px]">
        {loading
          ? Array(10)
            .fill(0)
            .map((_, i) => <SkeletonCardProduct key={i} />)
          : productData.length > 0
            ? productData.map((product) => (
              <ProductCardAdmin
                key={product._id}
                data={product}
                onEdit={() => {
                  setEditData(product);
                  setOpenEdit(true);
                }}
                onDelete={() => {
                  setDeleteProductId(product._id);
                  setOpenDelete(true);
                }}
              />
            ))
            :
            <NoData />
        }
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 pb-8">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 cursor-pointer border-blue-200 shadow"
          >
            Previous
          </button>
          <span className="flex items-center font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 cursor-pointer border border-blue-200 shadow"
          >
            Next
          </button>
        </div>
      )}

      {openDelete && (
        <ConfirmDelete
          close={() => setOpenDelete(false)}
          confirm={handleDelete}
          cancle={() => setOpenDelete(false)}
        />
      )}

      {openEdit && editData && (
        <EditProduct
          close={() => {
            setOpenEdit(false);
            setEditData(null);
          }}
          data={editData}
          fetchData={fetchProductData}
        />
      )}
    </section>
  );
};

export default Product;
