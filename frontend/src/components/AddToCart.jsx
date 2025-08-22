import React, { useEffect, useState } from 'react'
import Api from '../config/Api';
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast';
import { useGlobal } from '../provider/GlobalProvider';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from 'react-icons/fa';

const AddToCart = ({ data }) => {
  const [loading, setLoading] = useState(false)
  const cartItemData = useSelector(state => state.cartItem.cartProducts)
  const [isAblableCaet, setIsAblableCaet] = useState(false)
  const [cartItemDetails, setCartItemDetails] = useState()
  const [qty, setQty] = useState(1)
  const { fetchCartItems, handleUpdateQty, deleteCartItem } = useGlobal()

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
        await handleUpdateQty(cartItemDetails._id, qty - 1,qty)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full max-w-[150px]">
      {
        isAblableCaet ? (
          <div className='flex pb-2 w-full h-fit'>
            <button
              onClick={decreseQty}
              className='bg-green-600 hover:bg-green-700 text-white px-1 py-1 rounded flex-1 w-full cursor-pointer flex items-center justify-center'
            >
              <FaMinus />
            </button>
            <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>
            <button
              onClick={increseQty}
              className='bg-green-600 hover:bg-green-700 text-white px-1 py-1 rounded flex-1 w-full cursor-pointer flex items-center justify-center'
            >
              <FaPlus />
            </button>
          </div>
        ) : (
          <button
            className="rounded cursor-pointer w-full bg-green-600 p-1 hover:bg-green-700 px-4 transition-all text-white"
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
