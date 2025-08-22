import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Api from '../config/Api';
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast';
import { useGlobal } from '../provider/GlobalProvider';

const CardProduct = ({ data }) => {
    const { name, image, price, discount, unit } = data;
    const [loading, setLoading] = useState(false)
    const { fetchCartItems } = useGlobal()
    const discountedPrice = discount
        ? (price - price * (discount / 100)).toFixed(2)
        : price;

    const formatSlug = str =>
        str.toLowerCase().replace(/&|,/g, '').replace(/\s+/g, '-');

    const url = `/product/${formatSlug(data.name)}-${data._id}`

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
        <Link to={url} className="border border-gray-200 p-3 rounded-lg shadow-sm transition-all lg:min-w-50 md:min-w-46 min-w-46 max-w-53 w-full">
            <div className="w-full h-28 lg:h-34 md:h-32  rounded bg-white flex items-center justify-center overflow-hidden">
                <img
                    src={image?.[0] || '/default.jpg'}
                    alt={name}
                    className="h-full object-contain scale-110"
                />
            </div>

            <p className="text-sm text-green-600 rounded w-fit bg-green-100 mt-2 p-2 py-[0.5px]">10 Min</p>

            <h3 className="text-sm font-semibold pt-1 text-ellipsis line-clamp-1">{name}</h3>

            <p className="text-sm w-fit py-1 text-gray-600 line-clamp-1">{unit}</p>

            <div className="mt-1 flex items-center justify-between ">
                <div className="flex items-center gap-2">
                    <span className="text-green-600 font-medium">₹{Math.round(discountedPrice)}</span>
                    {discount > 0 && (
                        <span className="text-sm line-through text-gray-500">₹{Math.round(price)}</span>
                    )}
                </div>
                {
                    data.stock == 0 ? (
                        <p className='p-1 py-2 cursor-no-drop w-fit text-red-500 text-center'>Out of stock</p>
                    ) : (
                        <div className=" w-fit py-1">
                            <button className='rounded cursor-pointer w-full bg-green-600 p-1 hover:bg-green-700 px-4 transition-all text-white' onClick={addToCart} >
                                Add
                            </button>
                        </div>
                    )
                }
            </div>
        </Link >
    );
};

export default CardProduct;
