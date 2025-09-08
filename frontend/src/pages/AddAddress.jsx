import React from 'react'
import { useForm } from "react-hook-form"
import { IoClose } from 'react-icons/io5'

const AddAddress = ({ close }) => {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data)=>{
        console.log("data",data)
    }
    return (
        <section className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm overflow-auto">
            <div className="bg-white rounded max-w-xl p-5 w-full shadow-lg relative lg:mx-0 mx-3">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-lg">Add Address</h2>
                    <button onClick={close} className="text-gray-700 hover:text-black cursor-pointer">
                        <IoClose size={24} />
                    </button>
                </div>
                <div className='max-w-4xl  w-full relative lg:mx-0'>
                    <form  className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)} >
                        <div className="grid gap-1">
                            <label htmlFor='addressline'>Address Line :</label>
                            <input type="text" name="" id="addressline" className='bg-blue-50 p-2 outline-none rounded' {...register("addressline", {required: true})} />
                        </div>

                        <div className="grid gap-1">
                            <label htmlFor='city'>City :</label>
                            <input type="text" name="" id="city" className='bg-blue-50 p-2 outline-none rounded' {...register("city", {required: true})} />
                        </div>

                        <div className="grid gap-1">
                            <label htmlFor='state'>State :</label>
                            <input type="text" name="" id="state" className='bg-blue-50 p-2 outline-none rounded' {...register("state", {required: true})} />
                        </div>

                        <div className="grid gap-1">
                            <label htmlFor='mobile'>Mobile No :</label>
                            <input type="text" name="" id="mobile" className='bg-blue-50 p-2 outline-none rounded' {...register("mobile", {required: true})} />
                        </div>

                        <div className="grid gap-1">
                            <label htmlFor='pincode'>Pincode :</label>
                            <input type="text" name="" id="pincode" className='bg-blue-50 p-2 outline-none rounded' {...register("pincode", {required: true})} />
                        </div>

                        <div className="grid gap-1">
                            <label htmlFor='country'>Country :</label>
                            <input type="text" name="" id="country" className='bg-blue-50 p-2 outline-none rounded' {...register("country", {required: true})} />
                        </div>
                        

                        <button type='submit ' className='bg-blue-500 w-full py-2 mt-5 font-semibold hover:bg-blue-400 cursor-pointer rounded'>Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AddAddress
