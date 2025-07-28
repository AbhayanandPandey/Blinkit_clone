import React from 'react'

const loading = () => {
  return (
      <div className='flex justify-center items-center p-8' >
            <div role="status">
                <span className="loading loading-infinity loading-xl"></span>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
  )
}

export default loading
