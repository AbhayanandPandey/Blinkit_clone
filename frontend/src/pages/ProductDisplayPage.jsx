import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../config/Api'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import Divider from '../components/Divider'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params.product.split('-').slice(-1)[0]

  const [data, setData] = useState({
    name: '',
    image: [],
  })
  const [image, setImage] = useState(0)
  const [loading, setLoading] = useState(false)

  const discountedPrice = data.discount
    ? (data.price - data.price * (data.discount / 100)).toFixed(2)
    : data.price;

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
    <section className='bg-white mx-auto lg:px-8 md:px-8 p-4 px-4 grid lg:grid-cols-2 '>
      <div className='col-span-1'>
        <div className='bg-white lg:min-h-[60vh] lg:max-h-[60vh] md:min-h-[55vh] md:max-h-[55vh] rounded min-h-65 max-h-70 h-full w-full'>
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
          <div className='flex gap-4 md:items-center md:justify-center py-3 md:py-3 overflow-x-auto scrollbar-hidden md:mt-0 p-2 md:p-0'>
            {
              data.image.map((img, i) => {
                return (
                  <div className='md:h-30 md:w-30 lg:h-20 lg:w-20 h-20  min-h-20 min-w-20 cursor-pointer w-20 shadow  '>
                    <img
                      src={img}
                      alt='dtat'
                      key={i}
                      onClick={() => setImage(i)}
                      className={`w-full h-full object-scale-down  ${i === image ? "border-2 border-gray-300" : "border border-gray-200"} `}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      <div className='col-span-1 p-4 pl-0 pt-3 lg:pt-4 lg:pl-6 text-base md:text-lg'>
        <p className='text-sm text-black rounded-full w-fit bg-green-300 mt-2 p-2 py-[0.5px] m-2 ml-0'>10 Min</p>
        <h2 className='text-lg font-semibold md:text-xl lg:text-2xl'>{data.name}</h2>
        <p>{data.unit}</p>
        <Divider />
        <p>Price</p>
        <div className="border-2 bg-green-50 w-fit border-green-600 px-4 py-2 rounded flex items-center gap-2 ">
          <span className="text-green-600 text-lg md:text-xl font-semibold ">₹{Math.round(discountedPrice)}</span>
          {data.discount > 0 && (
            <span className="text-sm line-through text-gray-500 ">₹{Math.round(data.price)}</span>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductDisplayPage
