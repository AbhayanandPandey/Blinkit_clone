import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Api from '../config/Api'


const CategoryProduct = ({ id, name }) => {
    const [data, setData] = useState([])

    const fetchCategoryProduct = async () => {
        try {
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
        }
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])
    return (
        <div >
            <div className='mx-auto px-2 flex items-center justify-between p-4 md:mt-2 mt-2'>
                <h3 className=' text-xl md:text-lg font-semibold '>{name}</h3>
                <Link to='' className='text-green-600 hover:text-green-700'>see All</Link>
            </div>
            <div>

            </div>
        </div>
    )
}

export default CategoryProduct
