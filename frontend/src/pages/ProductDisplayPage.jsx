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
  const [image, setImage] = useState("")
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
        setImage(responseData.data.image[0])
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
        <div className=''>
          <img
            src={image}
            alt=""
          />
        </div>
      </div>
      <div>

      </div>
    </section>
  )
}

export default ProductDisplayPage
