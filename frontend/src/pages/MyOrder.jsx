import React from 'react'
import { useSelector } from 'react-redux'

const MyOrder = () => {
    const order = useSelector(state => state.orders.order)
    console.log(order)
    return (
        <div>
            orders
        </div>
    )
}

export default MyOrder
