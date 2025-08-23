import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const CartPageDataLg = ({ close }) => {
    return (
        <section className='bg-black/50 z-50 fixed top-0 bottom-0 left-0 right-0 transition-discrete '> 
            <div className='bg-white w-full lg:max-w-sm min-h-screen max-h-screen ml-auto opacity-100 backdrop:opacity-100'>
                <div className='z-50 p-4 flex items-center shadow-md gap-3 justify-between'>
                    <h2 className='font-semibold'>Cart</h2>
                    <Link to={'/'} className='lg:hidden'>
                        <button className='cursor-pointer' onClick={close}><IoClose size={25} /></button></Link>
                    <button className=' hidden lg:block cursor-pointer' onClick={close}><IoClose size={25} /></button>
                </div>
            </div>
        </section>
    )
}

export default CartPageDataLg
