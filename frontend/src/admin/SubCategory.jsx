import React, { useEffect, useState } from 'react'
import UploadSubCategory from '../components/UploadSubCategory'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Api from '../config/Api'
import DisplayTable from '../components/DisplayTable'
import ViewImage from '../components/ViewImage'
import { LuPencil } from 'react-icons/lu'
import { MdOutlineDelete } from 'react-icons/md'
import EditSubCategory from '../components/EditSubCategory'
import ConfirmDelete from '../components/ConfirmDelete'
import toast from 'react-hot-toast'
import { createColumnHelper } from '@tanstack/react-table'
import SkeletonCardForSubCategory from '../Skeleton/SkeletonCardForSubCategorys'

const SubCategory = () => {
  const [openAddSub, setOpenAddSub] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({ _id: '' })
  const [deleteSub, setDeleteSub] = useState({ _id: '' })
  const [openDelete, setOpenDelete] = useState(false)
  const columnHelper = createColumnHelper()

  const fetchSubCategory = async () => {
    setLoading(true)
    try {
      const response = await Axios({ ...Api.getSubCategories })
      const { data: responseData } = response
      if (responseData.success) {
        setData(responseData.data)
      } else {
        setData([])
      }
    } catch (error) {
      AxiosToastError(error)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubCategory()
  }, [])

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => (
        <span className="text-sm font-medium text-gray-800 truncate block max-w-[200px] pl-2">
          {info.getValue()}
        </span>
      )
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: info => (
        <div className='flex justify-center items-center'>
          <img
            src={info.getValue()}
            alt="sub"
            className="w-12 h-12 cursor-pointer"
            onClick={() => setImageUrl(info.getValue())}
          />
        </div>
      )
    }),
    columnHelper.accessor('category', {
      header: 'Categories',
      cell: info => (
        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-scroll scrollbar-hidden pr-1 max-w-60">
          {info.getValue()?.map(cat => (
            <span
              key={cat._id}
              className="text-sm bg-gray-100 px-2 py-1 rounded shadow"
            >
              {cat.name}
            </span>
          ))}
        </div>
      )
    }),
    columnHelper.accessor('_id', {
      header: 'Action',
      cell: info => (
        <div className='flex gap-3 items-center justify-center'>
          <button onClick={() => {
            setOpenEdit(true)
            setEditData(info.row.original)
          }} className='cursor-pointer p-2 bg-green-100 rounded-2xl hover:text-green-500'>
            <LuPencil size={20} />
          </button>
          <button onClick={() => {
            setOpenDelete(true)
            setDeleteSub(info.row.original)
          }} className='cursor-pointer p-2 bg-red-100 rounded-2xl hover:text-red-500 '>
            <MdOutlineDelete size={20} />
          </button>
        </div>
      )
    })
  ]

  const handleDeleteSub = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...Api.deleteSubCategory,
        data: deleteSub
      })
      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        await fetchSubCategory()
        setOpenDelete(false)
        setDeleteSub({ _id: '' })
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <div className="p-2 pl-8 bg-white shadow-md flex items-center justify-between pr-8">
        <h2 className="font-semibold text-lg">Sub Category</h2>
        <button
          onClick={() => setOpenAddSub(true)}
          className="text-sm hover:bg-blue-600 hover:text-white cursor-pointer px-3 py-1 rounded shadow border border-neutral-200"
        >
          Add Sub Category
        </button>
      </div>

      <div className="p-4 my-8 bg-white shadow-sm overflow-auto w-full max-w-[95vw]">
        {loading ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {Array(6).fill(0).map((_, i) => <SkeletonCardForSubCategory key={i} />)}
          </div>
        ) : (
          <DisplayTable data={data} column={columns} loading={loading} />
        )}
      </div>

      {openAddSub && (
        <UploadSubCategory close={() => {
          setOpenAddSub(false)
          fetchSubCategory()
        }} />
      )}
      {imageUrl && (
        <ViewImage url={imageUrl} close={() => setImageUrl('')} />
      )}
      {openEdit && (
        <EditSubCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchSubCategory}
        />
      )}
      {openDelete && (
        <ConfirmDelete
          cancle={() => setOpenDelete(false)}
          close={() => setOpenDelete(false)}
          confirm={handleDeleteSub}
        />
      )}
    </section>
  )
}

export default SubCategory

