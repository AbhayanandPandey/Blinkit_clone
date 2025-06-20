import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'

const UploadSubCategory = ({ close }) => {
    const [subData, setSubData] = useState({
        name: '',
        image: '',
        category: []
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setSubData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    return (
        <section className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded max-w-5xl  p-5 w-full shadow-lg relative lg:mx-0 mx-3">
                <div className="flex items-center justify-between ">
                    <h2 className="font-semibold ">Add New Category</h2>
                    <button onClick={close} className="text-gray-700 hover:text-black transition cursor-pointer">
                        <IoClose size={24} />
                    </button>
                </div>
                <div>
                    <form action="" className="my-3 grid gap-3">
                        <div className='grid gap-1'>
                            <label htmlFor="name">
                                Name
                            </label>
                            <input
                                className='bg-blue-50 border border-blue-100 p-2 rounded outline-none focus:ring-2 focus:ring-amber-300 '
                                type="text"
                                name="name"
                                id="name"
                                value={subData.name}
                                onChange={handleChange}
                                autoComplete='off'
                            />
                        </div>
                        <div className="grid gap-1">
                            <p>Image</p>
                            <div className="flex flex-col gap-3 lg:flex-row items-center" >
                                <div className="border border-blue-200 h-36 lg:w-36 w-full bg-blue-50 rounded flex justify-center items-center">
                                {
                                    !subData.image ? (
                                        <p className='text-neutral-400 text-sm '>No Image</p>
                                    ) : (
                                        <img
                                        className=''

                                        />
                                    )
                                }
                            </div>
                            <button className='px-5 py-2 rounded text-white font-medium transition cursor-pointer bg-amber-400 hover:bg-amber-500'>Upload Image</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default UploadSubCategory
