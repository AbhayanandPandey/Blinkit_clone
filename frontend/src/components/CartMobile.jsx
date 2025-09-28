import React from 'react'
import { useGlobal } from '../provider/GlobalProvider'
import { FaAngleRight, FaCartShopping } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'

const CartMobile = () => {
  const { totoalPrice, totalQty } = useGlobal()
  const location = useLocation()

  if (location.pathname === "/checkout" || location.pathname === "/cart") return null

  if (!totalQty || !totoalPrice) return null

  const getServiceChargeRate = (price) => {
    if (price <= 200) return 0.085
    if (price > 200 && price <= 400) return 0.07
    if (price > 400 && price <= 1000) return 0.06
    return 0.01
  }

  const finalPrice = totoalPrice 
  const serviceCharge = finalPrice * getServiceChargeRate(finalPrice)
  const grandTotal = finalPrice + serviceCharge

  return (
    <Link to={'/cart'}>
      <div className="sticky lg:hidden bottom-5 z-10">
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-green-500 to-green-700 px-4 py-3 rounded-full shadow-xl flex items-center gap-5 text-neutral-100 min-w-56 max-w-64 sm:min-w-45 justify-center transition-all duration-300 hover:scale-105">
            
            <div className="p-2 sm:p-3 bg-green-600 rounded-full">
              <FaCartShopping size={22} />
            </div>

            <div className="leading-tight text-center">
              <p className="text-sm font-medium">{totalQty} Items</p>
              <p className="text-lg font-bold">{grandTotal.toFixed(2)} ₹</p>
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
