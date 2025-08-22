import React from 'react'
import Api from '../config/Api';
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast';
import { useGlobal } from '../provider/GlobalProvider';
import { useState } from 'react';
import Loading from './Loading';

const AddToCart = ({data}) => {
    const [loading, setLoading] = useState(false)
    const { fetchCartItems } = useGlobal()

    const addToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            setLoading(true)
            const response = await Axios({
                ...Api.addToCart,
                data: {
                    productId: data?._id
                }
            })
            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItems) {
                    fetchCartItems()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <button className='rounded cursor-pointer w-full bg-green-600 p-1 hover:bg-green-700 px-4 transition-all text-white' onClick={addToCart} >
               { loading ? <Loading /> : "Add" } 
            </button>
        </div>
    )
}

export default AddToCart
