import React from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'


function Home() {
  return (
    <section className='bg-white'>
      <div className=" w-full mx-auto lg:py-2 lg:px-4">
        <div className={`w-full h-full md:max-h-52 max-h-96 bg-blue-100 rounded ${!banner && 'animate-pulse'} `}>
          <img
            src={banner}
            alt='banner'
            className='w-full h-full hidden md:block '
          />
          <img
            src={bannerMobile}
            alt='banner'
            className='w-full h-full md:hidden lg:hidden  '
          />
        </div>
      </div>
    </section>
  )
}

export default Home
