import React from 'react'
import { IoClose } from 'react-icons/io5'

const ViewImage = ({url,close}) => {
    return (
        <section className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded max-w-md p-5 w-full shadow-lg relative max-h-[80vh] ">
                <button onClick={close} className=' block w-fit ml-auto cursor-pointer'><IoClose size={25} /></button>
                <img src={url} alt="full screen "  className='w-full h-full object-scale-down'/>
            </div>
        </section>
    )
}

export default ViewImage
