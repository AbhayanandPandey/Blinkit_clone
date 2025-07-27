import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Api from '../config/Api'
import { useEffect } from 'react'

const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const categoryId = params.category.split('-').slice(-1)[0]
  const subCategoryId = params.subcategory.split('-').slice(-1)[0]

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...Api.getProductsByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 20
        }
      })
      const{data:responseData} = response
      if(responseData.success){
        if(responseData.page === 1)
        {
          setData(responseData.data)
        }
        else {
          setData([...data,...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchProductData()
  },[params])

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
