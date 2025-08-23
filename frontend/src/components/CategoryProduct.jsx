import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Api from '../config/Api'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
// import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { TfiAngleLeft, TfiAngleRight  } from "react-icons/tfi";
import { useSelector } from 'react-redux'

const CategoryProduct = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)
    const scrollRef = useRef(null)

    const fetchCategoryProduct = async () => {
        try {
            setloading(true)
            const response = await Axios({
                ...Api.getProductsByCategory,
                data: { id }
            })
            const { data: responseData } = response
            if (responseData.success) {
                setData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 200
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    
  const subCategoryData = useSelector(state => state.product.subcategory);
  const navigate = useNavigate();

  const handleRedirectProduct = (categoryId, categoryName) => {
    const subcate = subCategoryData.find(sub =>
      sub.category?.some(c => c._id === categoryId)
    );

    if (!subcate) return;

    const formatSlug = str =>
      str.toLowerCase().replace(/&|,/g, '').replace(/\s+/g, '-');

    const categorySlug = `${formatSlug(categoryName)}-${categoryId}`;
    const subcategorySlug = `${formatSlug(subcate.name)}-${subcate._id}`;

    navigate(`/${categorySlug}/${subcategorySlug}`);
  };

    const loadingCard = new Array(7).fill(null)

    return (
        <div className="relative">
            <div className='mx-auto px-2 flex items-center justify-between p-4 md:mt-2 mt-2'>
                <h3 className=' text-xl md:text-lg font-semibold '>{name}</h3>
                <button className='text-green-600 cursor-pointer hover:text-green-700'
                onClick={() => handleRedirectProduct(id, name)}
                >See All</button>
            </div>

            <div className='relative'>
                <div
                    className='flex items-start gap-2 md:gap-6 lg:gap-5.5 mx-auto p-2 overflow-x-auto scrollbar-hide scroll-smooth'
                    ref={scrollRef}

                >
                    {
                        loading
                            ? loadingCard.map((_, i) => <CardLoading key={i} />)
                            : data.map((p, i) => (
                                <CardProduct data={p} key={p._id + 'categoryWiseProduct' + i} />
                            ))
                    }
                </div>

                <div className='hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-4 pointer-events-none scroll-smooth'>
                    <button
                        onClick={() => scroll('left')}
                        className='pointer-events-auto cursor-pointer shadow rounded-full p-2 hover:bg-gray-100 bg-white'
                    >
                        <TfiAngleLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className='pointer-events-auto cursor-pointer shadow rounded-full p-2 hover:bg-gray-100 bg-white'
                    >
                        <TfiAngleRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct
