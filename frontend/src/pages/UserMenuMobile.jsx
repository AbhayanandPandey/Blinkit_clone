import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserMenu from '../components/UserMenu'
import { IoClose } from 'react-icons/io5'

const UserMenuMobile = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4 animate-fadeIn">
      <div className="relative w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
        <button
          onClick={() => navigate('/')}
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <IoClose size={24} />
        </button>

        <div className="pt-10 pb-6 px-6 text-center">
          <UserMenu />
        </div>
      </div>
    </section>
  )
}

export default UserMenuMobile
