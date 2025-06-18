import React, { useEffect, useState } from 'react'
import UploadCategory from '../components/UploadCategory'
import Loading from '../components/loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import Api from '../config/Api'
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";


const Category = () => {
  const [openUpload, setOpenUpload] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])

  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...Api.getCategories
      })
      const { data: responseData } = response
      if (responseData.success) {
        setCategoryData(responseData.data)
      }
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchCategory()
  }, [])
  return (
    <section className=''>
      <div className='p-2 pl-8  bg-white shadow-md flex items-center justify-between pr-8 ' >
        <h2 className='font-semibold'>Category</h2>
        <button onClick={() => setOpenUpload(true)} className='text-sm hover:bg-blue-600 hover:text-white cursor-pointer px-3 py-1 rounded shadow-[6px_1px_16px_2px_rgba(0,0,0,0.1)] border border-neutral-200'>Add category</button>
      </div>
      {
        !categoryData[0] && !loading && (
          <NoData />
        )
      }
      <div className=' py-8 px-7 w-full grid lg:grid-cols-5 md:grid-cols-4  grid-cols-2 gap-4 gap-y-6  place-items-center '>
        {
          categoryData.map((category, i) => {
            return (
              <div className='w-32 h-56 bg-gray-100 rounded shadow-md '>
                <img
                  alt={category.name}
                  src={category.image}
                  className='w-full object-scale-down'
                />
                <div className="flex justify-evenly" >
                  <button className='w-auto h-auto p-1 cursor-pointer rounded'>
                    <MdOutlineEdit size={24} />
                  </button>
                  <button className='w-auto h-auto p-1 cursor-pointer rounded'>
                    <MdOutlineDelete size={24} />
                  </button>
                </div>

              </div>
            )
          })
        }
      </div>
      {
        loading && (
          <Loading />
        )
      }
      {
        openUpload && (
          <UploadCategory fetchData={fetchCategory} close={() => setOpenUpload(false)} />
        )
      }
    </section>
  )
}

export default Category
