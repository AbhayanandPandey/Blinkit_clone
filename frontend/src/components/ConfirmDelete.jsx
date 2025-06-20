import React from 'react'
import { IoClose } from 'react-icons/io5'

const ConfirmDelete = ({ close, cancle, confirm }) => {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm'>
            <div className='bg-white rounded max-w-md p-4 w-full shadow-lg relative lg:mx-0 mx-3'>
                <div className="flex justify-between items-center gap-3">
                    <h1 className='font-semibold'>
                        Parmanent Delete
                    </h1>
                    <button onClick={close} className="text-gray-700 hover:text-black cursor-pointer">
                        <IoClose size={24} />
                    </button>
                </div>
                <p className='my-4 '>Are you sure to delete this category permanently</p>
                <div className='flex justify-evenly  itens-center gap-3 '>

                    <button onClick={cancle} className="text-gray-700 hover:text-black cursor-pointer shadow-md py-1 px-3 rounded  bg-red-100 hover:bg-red-200 ">
                        cancle
                    </button>

                    <button onClick={confirm} className="text-gray-700 hover:text-black cursor-pointer shadow-md py-1 px-3 rounded bg-green-100 hover:bg-green-200">
                        delete
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete
