import React, { useEffect, useState } from 'react'
import UploadSubCategory from '../components/UploadSubCategory'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Api from '../config/Api'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'

const SubCategory = () => {
  const [openAddSub, setOpenAddSub] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const columnHelper = createColumnHelper()

  const fetchSubCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({ ...Api.getSubCategories })
      const { data: responseData } = response
      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
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
      cell: info => <span>{info.getValue()}</span>
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: info => (
        <div className='flex justify-center items-center'>
          <img
          src={info.getValue()}
          alt="sub"
          className="w-12 h-12 "
        />
        </div>
      )
    }),
    columnHelper.accessor('category', {
      header: 'Categories',
      cell: info => (
        <span className="list-disc ml-4">
          {info.getValue()?.map(cat => (
            <span key={cat._id} className="text-sm">{cat.name}</span>
          ))}
        </span>
      )
    }),
  ]

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

      <div className="p-4 bg-white shadow-sm">
        <DisplayTable data={data} column={columns} loading={loading} />
      </div>

      {openAddSub && (
        <UploadSubCategory close={() => {
          setOpenAddSub(false)
          fetchSubCategory()
        }} />
      )}
    </section>
  )
}

export default SubCategory
