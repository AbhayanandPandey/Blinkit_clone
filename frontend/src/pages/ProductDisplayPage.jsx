import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../config/Api'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa' 

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
    <section className='bg-white mx-auto lg:px-8 md:px-8 p-4 px-4 grid lg:grid-cols-5 '>
      <div className='col-span-3'>
        <div className='bg-white lg:min-h-[60vh] lg:max-h-[60vh] md:min-h-[55vh] md:max-h-[55vh] rounded min-h-60 max-h-60 h-full w-full'>
          <img
            src={data.image[image]}
            alt=""
            className='w-full h-full object-scale-down'
          />
        </div>
        <div className='pt-2 flex items-center justify-center gap-3 '>
          {
            data.image.map((img, i) => {
              return (
                <div key={i} className={` rounded-full w-3 h-3 md:w-5 md:h-5 ${i === image ? "bg-slate-300 " : "bg-slate-200"} `}>
                </div>
              )
            })
          }
        </div>

        <div className='grid relative'>
          <div className='flex gap-4 md:items-center md:justify-center py-3 md:py-3 overflow-x-auto scrollbar-hidden mt-3 md:mt-0 p-2 md:p-0'>
            {
              data.image.map((img, i) => {
                return (
                  <div className='md:h-30 md:w-30 lg:h-20 lg:w-20 h-20  min-h-20 min-w-20 cursor-pointer w-20 shadow  '>
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
