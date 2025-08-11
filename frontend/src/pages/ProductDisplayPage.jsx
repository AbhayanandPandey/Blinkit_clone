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
    <section className='bg-white mx-auto lg:px-8 md:px-8 p-4 px-3 grid lg:grid-cols-5 '>
      <div className='col-span-3'>
        <div className='bg-white lg:min-h-[60vh] lg:max-h-[60vh] rounded min-h-56 max-h-56 h-full w-full'>
          <img
            src={data.image[image]}
            alt=""
            className='w-full h-full object-scale-down'
          />
        </div>
        <div className='flex items-center justify-center gap-3 '>
          {
            data.image.map((img, i) => {
              return (
                <div key={i} className={` rounded-full w-5 h-5 ${i === image ? "bg-slate-300 " : "bg-slate-200"} `}>
                </div>
              )
            })
          }
        </div>
        <div className='grid'>
          <div className='flex gap-4 lg:items-center lg:justify-center py-3  w-[full+100px] overflow-x-auto scrollbar-hidden mt-3 md:mt-0 p-2 md:p-0 bg-gray-00 lg:bg-white'>
            {
              data.image.map((img, i) => {
                return (
                  <div className='h-20 min-h-20 min-w-20 cursor-pointer w-20 shadow  '>
                    <img
                      src={img}
                      alt='dtat'
                      key={i}
                      onClick={()=>setImage(i)}
                      className={`w-full h-full object-scale-down  ${i===image ? "border-2 border-gray-300" : "border border-gray-200"} `}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <div>

      </div>
    </section>
  )
}

export default ProductDisplayPage
