import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <section className='bg-white h-full'>
      <div className='container mx-auto p-3 grid lg:grid-cols-[250px_1fr]'>
        <div className='py-4 sticky top-24 overflow-auto hidden lg:block h-full'>
          <UserMenu />
        </div>
        <div className='bg-white p-4 flex justify-center items-center'>
          <div className='w-full'>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
