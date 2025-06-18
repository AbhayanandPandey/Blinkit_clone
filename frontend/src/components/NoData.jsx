import React from 'react'
import NoDataImage from '../assets/nothing here yet.webp'

const NoData = () => {
    return (
        <div className='flex justify-center items-center flex-col p-4 gap-2'>
            <img
                src={NoDataImage}
                alt="No Data"
                className='w-36 '
            />
            <p className='text-neutral-500'>Category data is not ablable</p>
        </div>
    )
}

export default NoData
