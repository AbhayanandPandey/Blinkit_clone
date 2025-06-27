import React, { useEffect, useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import Api from '../config/Api'
import Axios from '../utils/Axios'

const Product = () => {
  const [productData,setProductData] = useState([])
  const [page,setPage] = useState(1)
  const fetchProductData = async()=>{
    try {
      const response = await Axios({
        ...Api.getProducts,
        data:{
          page:page,
        }
      })
      const {data:ProductResponse} = response
      console.log('s',ProductResponse)
      if(ProductResponse.success){
        setProductData(ProductResponse.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  useEffect(()=>{
    fetchProductData()
  },[])
  return (
    <div>
      product
    </div>
  )
}

export default Product
