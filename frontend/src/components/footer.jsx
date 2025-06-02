import React from 'react'
import { FaFacebook, FaInstagram, FaGithub, FaGoogle, FaLinkedin } from 'react-icons/fa'

function footer() {
  return (
    <footer className='border-t'>
      <div className="container p-4 mx-auto text-center  flex flex-col lg:flex-row lg:justify-between gap-4">
        <p>© All Rights reserved 2025 </p>
        <div className='flex item-center gap-4 justify-center text-2xl'>
          <a href="" className='text-blue-700 hover:-rotate-y-180 transition-transform'>
            <FaFacebook />
          </a>
          <a href="" className='text-shadow-black hover:-rotate-y-180 transition-transform'>
            <FaGithub />
          </a>
          <a href="" className='text-pink-500 hover:-rotate-y-180 transition-transform'>
            <FaInstagram />
          </a>
          <a href="" className='text-blue-600 hover:-rotate-y-180 transition-transform'>
            <FaLinkedin />
          </a>
        </div>
      </div>

    </footer>
  )
}

export default footer
