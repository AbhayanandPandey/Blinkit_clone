import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import UplaodImage from '../utils/uploadImage'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const UploadSubCategory = ({ close }) => {
    const [subData, setSubData] = useState({
        name: '',
        image: '',
        category: []
    })
    const allcategoryData = useSelector(state => state.product.allCategory)

    const handleChange = (e) => {
        const { name, value } = e.target

        setSubData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handdleUploadImage = async (e) => {
        const file = e.target.files[0]

        if (!file) { return }

        const response = await UplaodImage(file);
        const { data: ImageResponse } = response;

        if (ImageResponse?.success && ImageResponse?.data?.url) {
            setSubData((prev) => ({
                ...prev,
                image: ImageResponse.data.url
            }));
            toast.success("Image uploaded successfully");
        } else {
            toast.error(ImageResponse?.message || "Image upload failed");
        }

    }
    const handleRemoveCategory = (Id) => {
        const index = subData.category.findIndex(el => el._id === Id)
        subData.category.splice(index, 1)
        setSubData((preve) => {
            return {
                ...preve,
            }
        })
    }
    const handlesubmit = (e)=>{
        e.preventDefault()
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
                    <form action="" onClick={handlesubmit} className="my-3 grid gap-3">
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
                                            <img src={subData.image} alt="subCategory" className="w-full h-full object-scale-down" />
                                        )
                                    }
                                </div>
                                <label htmlFor="uploadsub">
                                    <div className='px-5 py-2 rounded text-white font-medium transition cursor-pointer bg-amber-400 hover:bg-amber-500'>
                                        Upload Image
                                    </div>
                                    <input
                                        type='file'
                                        id='uploadsub'
                                        name='image'
                                        onChange={handdleUploadImage}
                                        className='hidden'
                                    />
                                </label>
                            </div>
                        </div>

                        <div className='grid gap-1'>
                            <label htmlFor="">
                                Select Category
                            </label>

                            <div className='border border-blue-200 focus-within:border-amber-400 rounded'>
                                <div className='flex flex-wrap gap-2'>
                                    {
                                        subData.category.map((cat, i) => {
                                            return (
                                                <p key={cat._id + 'selected'}
                                                    className='bg-white shadow-md px-1 m-1 flex justify-center items-center gap-2 '
                                                >{cat.name}
                                                    <div onClick={() => handleRemoveCategory(cat._id)} className='cursor-pointer hover:text-red-600 '><IoClose size={20} />
                                                    </div>
                                                </p>
                                            )

                                        })
                                    }
                                </div>
                                <select className=' w-full bg-transparent py-2 rounded px-4 outline-none  border border-blue-100 ' name="" id="" onChange={(e) => {
                                    const value = e.target.value
                                    const categoryIndex
                                        = allcategoryData.find(el => el._id == value)

                                    setSubData((preve) => {
                                        return {
                                            ...preve,
                                            category: [...preve.category, categoryIndex]
                                        }
                                    })
                                }
                                }>
                                    <   option value={''} disabled defaultValue='on' >Select Category</option>
                                    {
                                        allcategoryData.map((category, i) => {
                                            return (
                                                <option value={category?._id} key={category._id + 'subcategory'} >{category?.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <button
                            className={`px-4 py-1 border border-blue-200 rounded 
  ${subData.name && subData.image && subData.category[0]
                                    ? 'bg-amber-400 cursor-pointer'
                                    : 'bg-gray-200 cursor-not-allowed disabled'}`
                            }


                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default UploadSubCategory
