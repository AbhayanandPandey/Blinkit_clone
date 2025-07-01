import React from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'


function Home() {
  return (
    <section>
      <div className=" w-full mx-auto py-4 px-8">
        <div className={`w-full h-full max-h-48 bg-blue-100 rounded ${!banner && 'animate-pulse'} `}>
          <img
            src={banner}
            alt='banner'
            className='w-full h-ful '
          />
        </div>
      </div>
    </section>
  )
}

export default Home
