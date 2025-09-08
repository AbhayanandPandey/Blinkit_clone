import React from 'react'
import { IoClose } from 'react-icons/io5'

const AddAddress = ({close}) => {
    return (
        <section className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded max-w-4xl p-5 w-full shadow-lg relative lg:mx-0 mx-3">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-lg">Add Address</h2>
                    <button onClick={close} className="text-gray-700 hover:text-black cursor-pointer">
                        <IoClose size={24} />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default AddAddress
