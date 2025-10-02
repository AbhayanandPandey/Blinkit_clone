import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Failed = () => {
  return (
    <div className='m-2 w-full bg-red-200 p-4 rounded mx-auto max-w-md py-5 flex flex-col justify-center items-center gap-5'>
            <p className='text-red-800 font-bold text-lg text-center  '>Oredr Canceled !</p>
            <Link to={'/'} className='border border-red-900 px-4 py-1 text-red-900 hover:bg-red-800 hover:text-white rounded transition-all cursor-pointer'> Go To Home</Link>
        </div>
  )
}

export default Failed
