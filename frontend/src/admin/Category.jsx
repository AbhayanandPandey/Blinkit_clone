import React, { useEffect, useState } from 'react';
import UploadCategory from '../components/UploadCategory';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import { MdOutlineEdit, MdOutlineDelete } from 'react-icons/md';
import AxiosToastError from '../utils/AxiosToastError';
import SkeletonCard from '../Skeleton/skeletonCard';
import EditCategory from '../components/EditCategory';
import ConfirmDelete from '../components/ConfirmDelete';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const [openUpload, setOpenUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ name: '', image: '' });
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({ _id: '' });

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...Api.getCategories });
      const { data: responseData } = response;
      if (responseData.success) {
        setCategoryData(responseData.data || []);
      } else {
        setCategoryData([]);
      }
    } catch (error) {
      AxiosToastError(error);
      setCategoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      setLoading(true);
      const deleteCategoryData = await Axios({
        ...Api.deleteCategoty,
        data: deleteCategory,
      });
      const { data: deleteData } = deleteCategoryData;
      if (deleteData.success) {
        toast.success(deleteData.message);
        await fetchCategory();
        setOpenDelete(false);
        setDeleteCategory({ _id: '' });
      } else {
        toast.error(deleteData.message || 'Failed to delete');
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section className="">
      <div className="p-2 pl-8 bg-white shadow-md flex items-center justify-between pr-8">
        <h2 className="font-semibold text-lg">Category</h2>
        <button
          onClick={() => setOpenUpload(true)}
          className="text-sm hover:bg-blue-600 hover:text-white cursor-pointer px-3 py-1 rounded shadow border border-neutral-200"
        >
          Add Category
        </button>
      </div>

      {!Array.isArray(categoryData) || categoryData.length === 0 && !loading && <NoData />}

      <div className="py-8 px-7 w-full grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4 gap-y-6 place-items-center">
        {loading
          ? Array(10).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : Array.isArray(categoryData) && categoryData.map((category, i) => (
            <div
              key={category._id || i}
              className="w-32 h-56 bg-gray-100 rounded shadow-md flex flex-col justify-between"
            >
              <img
                alt={category.name}
                src={category.image}
                className="w-full h-48 object-contain rounded-t"
              />
              <div className="flex justify-between px-5 py-1">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="p-1 bg-green-200 hover:bg-green-300 rounded cursor-pointer"
                >
                  <MdOutlineEdit size={20} />
                </button>
                <button
                  onClick={() => {
                    setOpenDelete(true);
                    setDeleteCategory(category);
                  }}
                  className="p-1 bg-red-200 hover:bg-red-300 rounded cursor-pointer"
                >
                  <MdOutlineDelete size={20} />
                </button>
              </div>
            </div>
          ))}
      </div>

      {openUpload && (
        <UploadCategory fetchData={fetchCategory} close={() => setOpenUpload(false)} />
      )}

      {openEdit && (
        <EditCategory close={() => setOpenEdit(false)} data={editData} fetchData={fetchCategory} />
      )}

      {openDelete && (
        <ConfirmDelete
          close={() => setOpenDelete(false)}
          cancle={() => setOpenDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default Category;
