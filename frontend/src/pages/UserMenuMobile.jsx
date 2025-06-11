import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserMenu from '../components/UserMenu'
import { IoClose } from 'react-icons/io5'

const UserMenuMobile = () => {
  const navigate = useNavigate()
  return (
     <div>
      <section className="bg-white h-full w-full py-2">
      <button onClick={()=>navigate('/')} className='text-neutral-800 block w-fit ml-auto'>
        <IoClose size={25} />
      </button>
      <div className="container mx-auto px-3 pb-8">
        <UserMenu />
      </div>
    </section>
     </div>
  )
}

export default UserMenuMobile
