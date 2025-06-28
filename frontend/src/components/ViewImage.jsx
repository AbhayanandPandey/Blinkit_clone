import React from 'react'
import { IoClose } from 'react-icons/io5'

const ViewImage = ({url,close}) => {
    return (
        <section className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white/0 rounded max-w-md p-5 w-full relative max-h-[80vh] ">
                <button onClick={close} className=' block w-fit ml-auto cursor-pointer text-white '><IoClose size={25} /></button>
                <img src={url} alt="full screen "  className='w-full min-h-fit object-scale-down '/>
            </div>
        </section>
    )
}

export default ViewImage
