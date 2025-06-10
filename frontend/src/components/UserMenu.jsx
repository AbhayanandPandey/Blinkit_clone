import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Divider from './Divider'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import Api from '../config/Api'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const UserMenu = ({close}) => {
    const user = useSelector((state) => state?.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (!user || !user.id) {
        return null 
    }
    const handleLogout =async()=>{
        try {
            const response = await Axios ({
                ...Api.logout
            })
            if(response.data.success){
                if(close)
                {
                close()
                }
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                navigate('/')
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
    <div>
        <div className="font-semibold">My Account</div>
        <div className="text-sm pt-1">{user.name || user.mobile}</div>
        <Divider />
        <div className="text-sm grid gap-2 text-gray-600">
            <Link to={''} className='px-2'>My orders</Link>
            <Link to={''} className='px-2'>Save Address</Link>
            <button className='text-left cursor-pointer px-2' onClick={handleLogout}>Log Out</button>
        </div>
    </div>
  )
}

export default UserMenu
