import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import NoDataImage from '../assets/nothing_here_yet.webp'

const MyOrder = () => {
    const order = useSelector(state => state.orders.order)
    const navigate = useNavigate()

    return (
        <section>
            {/* Header */}
            <div className="p-2 pl-8 bg-white shadow-md flex items-center justify-between pr-8">
                <h2 className="font-semibold text-lg">Orders</h2>
                <Link
                    to={'/'}
                    className="text-sm hover:bg-blue-600 hover:text-white cursor-pointer px-3 py-1 rounded shadow border border-neutral-200"
                >
                    Home
                </Link>
            </div>

            {/* If No Orders */}
            <div>
                {!order[0] && (
                    <div className="flex flex-col items-center justify-center text-center h-full py-10">
                        <img
                            src={NoDataImage}
                            alt="No Data"
                            className="w-64 mb-4"
                        />
                        <p className="text-gray-500 text-lg mb-4">No orders found.</p>
                        <Link
                            to="/"
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                        >
                            Order Products
                        </Link>
                    </div>
                )}
            </div>

            {/* Orders List */}
            <div className="p-4 space-y-4">
                {order.map((o, i) => {
                    const price = o?.subTotalAmt || 0;
                    const total = o?.totalAmt || 0;

                    return (
                        <div
                            key={o._id || i}
                            className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-md"
                        >
                            {/* Product Image */}
                            <div
                                className="w-20 h-20 flex-shrink-0 shadow-md rounded overflow-hidden cursor-pointer"
                                onClick={() => navigate(`/product/${o?.product_details?.name?.split(" ").join("-")}-${o?.productId}`)}
                            >
                                <img
                                    src={o?.product_details?.images?.[0]}
                                    alt={o?.product_details?.name}
                                    className="object-contain w-full h-full"
                                />
                            </div>

                            {/* Order Details */}
                            <div
                                className="flex flex-col flex-1 cursor-pointer"
                                onClick={() => navigate(`/product/${o?.product_details?.name?.split(" ").join("-")}-${o?.productId}`)}
                            >
                                <p className="font-medium text-gray-800 line-clamp-1">
                                    {o?.product_details?.name}
                                </p>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-green-600 font-semibold">
                                        ₹{price.toFixed(2)}
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                        Total: ₹{total.toFixed(2)}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Status: {o?.payment_status || "Pending"}
                                </p>
                                <p className="text-xs text-gray-500">
                                    OrderId: {o?.orderId}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default MyOrder
