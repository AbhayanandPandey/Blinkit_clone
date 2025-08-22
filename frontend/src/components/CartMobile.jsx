import React from 'react'
import { useGlobal } from '../provider/GlobalProvider'
import { FaAngleRight, FaCartShopping } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const CartMobile = () => {
    const { totoalPrice, totalQty } = useGlobal()

    if (!totalQty || !totoalPrice) return null

    return (
        <Link to={'/cart'}>
            <div className='p-2 sticky lg:hidden bottom-5'>
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                    <div className="bg-green-600 px-4 py-3 rounded-full shadow-xl flex items-center gap-5 text-neutral-100 min-w-40 sm:min-w-45 justify-center transition-all duration-300 hover:scale-105">
                        <div className="p-2 sm:p-3 bg-green-500 rounded-full">
                            <FaCartShopping size={22} />
                        </div>

                        <div className="leading-tight text-center">
                            <p className="text-sm font-medium">{totalQty} Items</p>
                            <p className="text-lg font-bold">{totoalPrice} ₹</p>
                        </div>
                        <div>
                            <FaAngleRight size={22} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default CartMobile
