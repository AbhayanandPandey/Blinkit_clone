import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa'
import UserAvatarEdit from '../components/UserAvatarEdit'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Api from '../config/Api'
import toast from 'react-hot-toast'
import fetchUserDetails from '../utils/fetchUserDetails'
import { setUserDetails } from '../store/userSlice'

const UserProfile = () => {
  const user = useSelector(state => state.user)
  const [openProfile, setOpenProfile] = useState(false)
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  })
  useEffect(()=>{
    setUserData({
      name: user.name,
    email: user.email,
    mobile: user.mobile,
    })
  },[user])
  const handleOnchange =(e)=>{
    const {name,value} = e.target;
    setUserData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const response = await Axios({
        ...Api.updateUser,
        data:userData
      })
      const {data:responseData}= response
      if(responseData.error){
        toast.error(responseData.message)
      }
      if(responseData.success){
        toast.success(responseData.message)
        const userDataa = await fetchUserDetails()
        dispatch(setUserDetails(userDataa.data))
      }
    } catch (error) {
      AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }
  return (
    <div>
      <div className='w-20 h-20 bg-red-400 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
        {
          user.avatar ? (
            <img
              alt={user.name}
              src={user.avatar}
              className='h-full w-full'
            />
          ) : (
            <FaRegUserCircle size={65} />
          )
        }
      </div>
      <button onClick={() => setOpenProfile(true)} className=' min-w-20 text-sm cursor-pointer border border-amber-200  hover:bg-amber-300 px-3 py-1 rounded-full mt-3'>
        Edit
      </button>
      {
        openProfile && (
          <UserAvatarEdit close={() => setOpenProfile(false)} />
        )
      }

      <form className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className='grid'>
          <label htmlFor="name">Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder='Enter your name'
            className='p-2 bg-blue-50 outline-blue-100 rounded'
            value={userData.name}
            onChange={handleOnchange}
            required
          />
        </div>
        <div className='grid'>
          <label htmlFor="email">Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder='Enter your email'
            className='p-2 bg-blue-50 outline-blue-100 rounded'
            value={userData.email}
            onChange={handleOnchange}
            required
          />
        </div>
        <div className='grid'>
          <label htmlFor="mobile">Mobile no
          </label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            placeholder='Enter your mobile'
            className='p-2 bg-blue-50 outline-blue-100 rounded'
            value={userData.mobile}
            onChange={handleOnchange}
            required
          />
        </div>
        <button className="border border-amber-200 
        bg-amber-200 hover:bg-amber-300 px-4 py-2 font-semibold cursor-pointer rounded text-neutral-900 ">
          {
            loading?'loading..':'Submit'
          }
          </button>
      </form>

    </div>
  )
}

export default UserProfile
