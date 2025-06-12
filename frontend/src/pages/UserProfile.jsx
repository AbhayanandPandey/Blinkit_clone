import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa'
import UserAvatarEdit from '../components/UserAvatarEdit'

const UserProfile = () => {
  const user = useSelector(state => state.user)
  const [openProfile, setOpenProfile] = useState(false)
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
      <button onClick={()=>setOpenProfile(true)} className= ' min-w-20 text-sm cursor-pointer border border-amber-200  hover:bg-amber-300 px-3 py-1 rounded-full mt-3'>
        Edit
      </button>
      {
        openProfile && (
          <UserAvatarEdit close={()=>setOpenProfile(false)} />
        )
      }
    </div>
  )
}

export default UserProfile
