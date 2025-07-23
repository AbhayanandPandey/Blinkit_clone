import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Api from '../config/Api'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'


const CategoryProduct = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)

    const fetchCategoryProduct = async () => {
        try {
            setloading(true)
            const response = await Axios({
                ...Api.getProductsByCategory,
                data: {
                    id
                }
            })
            const { data: responseData } = response
            console.log(responseData)
            if (responseData.success) {

                setData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])
    const loadingCard = new Array(7).fill(null)
    return (
        <div >
            <div className='mx-auto px-2 flex items-center justify-between p-4 md:mt-2 mt-2'>
                <h3 className=' text-xl md:text-lg font-semibold '>{name}</h3>
                <Link to='' className='text-green-600 hover:text-green-700'>see All</Link>
            </div>
            <div className='flex items-center gap-4 md:gap-6 lg:gap-5.5 mx-auto p-2 overflow-hidden'>
                {
                    loading &&
                    loadingCard.map((_, i) => {
                        return (
                            <CardLoading />
                        )
                    })
                }
                {
                    data.map((p, i) => {
                        return (
                            <CardProduct data={p} key={p._id + 'categoryWiseProduct' + i} />
                        )
                    })
                }
                <div className='w-full max-w-full left-0 right-0 absolute hidden  lg:flex md:flex justify-between mx-auto'>
                    <button className='cursor-pointer shadow rounded-full p-2 hover:bg-gray-100 text-lg'>
                        <FaAngleLeft size={24}  />
                    </button>
                    <button className='cursor-pointer shadow rounded-full p-2 hover:bg-gray-100 text-lg'>
                        <FaAngleRight size={24}  />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct
