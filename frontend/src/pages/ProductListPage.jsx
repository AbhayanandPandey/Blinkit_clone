import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Api from '../config/Api'

const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [totalPage,setTotalPage] = useState(1)

  const fetchProductData = async ()=>{
    try {
      setLoading(true)
      const response = await Axios({
        ...Api.getProductsByCategoryAndSubCategory
      })
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='bg-white sticky top-24 lg:top-20'>
      <div className='w-full mx-auto px-4 py-2 grid grid-cols-[90px_1fr]  lg:grid-cols-[280px_1fr] md:grid-cols-[180px_1fr]'>
        <div className='h-full min-h-[76vh]'>
          <div>
            ffd
          </div>
        </div>

        <div className=''>
          fdf
        </div>
      </div>
    </section>
  )
}

export default ProductListPage
