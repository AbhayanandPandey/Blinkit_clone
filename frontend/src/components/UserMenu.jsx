import React from 'react'
import { useSelector } from 'react-redux'
import Divider from './Divider'
import { Link } from 'react-router-dom'

const UserMenu = () => {
    const user = useSelector((state) => state?.user)

    if (!user || !user.id) {
        return null // Don’t render anything if user is not logged in
    }

    return (
    <div>
        <div className="font-semibold">My Account</div>
        <div className="text-sm">{user.name || user.mobile}</div>
        <Divider />
        <div className="text-sm grid gap-2 text-gray-600">
            <Link to={''} className='px-2'>My orders</Link>
            <Link to={''} className='px-2'>Save Address</Link>
            <button className='text-left cursor-pointer px-2'>Log Out</button>
        </div>
    </div>
  )
}

export default UserMenu
