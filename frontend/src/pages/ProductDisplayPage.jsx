import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../config/Api'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params.product.split('-').slice(-1)[0]

  const [data, setData] = useState({
    name: '',
    image: [],
  })
  const [image, setImage] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...Api.getProductDetails,
        data: {
          productId: productId
        }
      })
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
    fetchProductDetails()
  }, [params])

  console.log(data)
  return (
    <section className='bg-white mx-auto p-4 grid lg:grid-cols-3 '>
      <div className='col-span-2'>
        <div className='bg-white rounded min-h-56 max-h-56 h-full w-full'>
          <img
            src={data.image[image]}
            alt=""
            className='w-full h-full object-scale-down'
          />
        </div>
      </div>
      <div>

      </div>
    </section>
  )
}

export default ProductDisplayPage
