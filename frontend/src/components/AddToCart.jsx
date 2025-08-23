import React, { useEffect, useState } from 'react'
import Api from '../config/Api';
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast';
import { useGlobal } from '../provider/GlobalProvider';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddToCart = ({ data }) => {
  const [loading, setLoading] = useState(false)
  const cartItemData = useSelector(state => state.cartItem.cartProducts)
  const [isAblableCaet, setIsAblableCaet] = useState(false)
  const [cartItemDetails, setCartItemDetails] = useState()
  const [qty, setQty] = useState(1)
  const { fetchCartItems, handleUpdateQty, deleteCartItem } = useGlobal()
  const navigate = useNavigate()

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
      if (error?.code === "ERR_NETWORK") {
        toast.error("Server unreachable. Please try again later.");
      } else if (error?.response?.data?.message === "invalid token") {
        toast.error("Unable to Add, Please login first!");
        navigate("/login");
      } else {
        AxiosToastError(error)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const checkItem = cartItemData.some(item => item.productId._id === data._id)
    setIsAblableCaet(checkItem)
    const qtyCartItem = cartItemData.find(items => items.productId._id === data._id)
    setCartItemDetails(qtyCartItem)
    setQty(qtyCartItem?.quantity)
  }, [data, cartItemData])

  const increseQty = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      setLoading(true)
      await handleUpdateQty(cartItemDetails._id, qty + 1, qty)
    } finally {
      setLoading(false)
    }
  }

  const decreseQty = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      setLoading(true)
      if (qty === 1) {
        await deleteCartItem(cartItemDetails._id)
      } else {
        await handleUpdateQty(cartItemDetails._id, qty - 1, qty)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full max-w-[150px]">
      {
        isAblableCaet ? (
          <div className='flex px-1 py-1 rounded w-full h-fit bg-green-400 '>
            <button
              onClick={decreseQty}
              className='bg-green-400 hover:bg-green-500 text-white px-1 py-2 rounded flex-1 w-full cursor-pointer flex items-center justify-center'
            >
              <FaMinus />
            </button>
            <p className='flex-1 w-full font-semibold text-white px-1 flex items-center justify-center'>{qty}</p>
            <button
              onClick={increseQty}
              className='bg-green-400 hover:bg-green-500 text-white px-1 -2 rounded flex-1 w-full cursor-pointer flex items-center justify-center'
            >
              <FaPlus />
            </button>
          </div>
        ) : (
          <button
            className="rounded cursor-pointer w-full bg-green-600 py-2 hover:bg-green-700 px-6 text-md font-medium transition-all text-white"
            onClick={addToCart}
            disabled={loading}
          >
            Add
          </button>
        )
      }

      {loading && <Loading />}
    </div>
  )
}

export default AddToCart
