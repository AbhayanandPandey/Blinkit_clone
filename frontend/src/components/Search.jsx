import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import { FaArrowLeft } from 'react-icons/fa6'
import useMobile from '../hooks/useMobile'
const Search = () => {
    const navigae = useNavigate()
    const location = useLocation()
    const [isSearch, setIsSearch] = useState(false)
    const [isMobile] = useMobile()
    useEffect(() => {
        const isSearcha = location.pathname === '/search'
        setIsSearch(isSearcha)
    }, [location])
    const redToSearch = () => {
        navigae('/search')
    }
    console.log("h", isSearch)
    return (
        <div className='w-full min-w-[360px] lg:min-[420px] h-11 rounded-lg border border-gray-200 overflow-hidden flex items-center  text-neutral-500 bg-gray-100  group focus-within:border-yellow-500 '>
            <div>
                
                {
                    (isMobile&&isSearch)?(
                        <Link to={'/'} className='flex justify-center items-center h-full p-2 cursor-pointer group-focus-within:text-yellow-400 bg-white rounded-full shadow-md m-1'>
                    <FaArrowLeft size={15} />
                </Link>
                    ):(
                        <button className='flex justify-center items-center h-full p-3 cursor-pointer group-focus-within:text-yellow-400'>
                    <IoSearch size={22} />
                </button>
                    )
                }
                
            </div>
            <div className='w-full h-full'>
                {
                    !isSearch ? (
                        <div onClick={redToSearch} className='w-full h-full flex  items-center'>
                            <TypeAnimation
                                sequence={[
                                    'Search "Milk" ',
                                    1000,
                                    'Search "Bread"',
                                    1000,
                                    'Search "Icecream"',
                                    1000,
                                    'Search "Fruits"',
                                    1000,
                                    'Search "Sugar"',
                                    1000,
                                    'Search "Paneer"',
                                    1000,
                                    'Search "Rice"',
                                    1000,
                                    'Search "Egg"',
                                    1000,
                                    'Search "Chips"',
                                    1000,
                                    'Search "Curd"',
                                    1000,
                                ]}
                                speed={50}
                                repeat={Infinity}
                            />
                        </div>
                    ) :
                        (
                            <div className='w-full h-full'>
                                <input
                                    type='text'
                                    placeholder='Search for Milk Bread and more...'
                                    autoFocus
                                    className='bg-transparent w-full h-full outline-none'
                                />
                            </div>
                        )
                }
            </div>

        </div>
    )
}

export default Search
