import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import { FaArrowLeft } from 'react-icons/fa6'
import useMobile from '../hooks/useMobile'
const Search = () => {
    const navigae = useNavigate()
    const location = useLocation()
    const [isFocused, setIsFocused] = useState(false);
    const [isSearch, setIsSearch] = useState(false)
    const [isMobile] = useMobile()
    const params = useLocation()
    const sText = params.search.slice(3)
    useEffect(() => {
        const isSearcha = location.pathname === '/search'
        setIsSearch(isSearcha)
    }, [location])
    const redToSearch = () => {
        navigae('/search')
    }
    const handleOnchange = (e) => {
        const value = e.target.value
        const url = `/search?q=${value}`
        navigae(url)
    }
    return (
        <>
            <div className='w-full min-w-[360px] lg:min-w-[480px] h-11 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-between text-neutral-500 bg-gray-100  group focus-within:border-gray-200 '>
                <div>
                    {
                        (isMobile && isSearch) ? (
                            <Link to={'/'} className='flex justify-center items-center h-[full-5px] w-[full-5px] p-2.5 cursor-pointer group-focus-within:text-gray-400 bg-white rounded-full shadow-md m-1'>
                                <FaArrowLeft size={15} />
                            </Link>
                        ) : (
                            isFocused ? (
                                <button
                                    onMouseDown={() => {
                                        setIsFocused(false);
                                        navigae('/'); // <- this ensures you go back to /
                                    }}
                                    className="flex justify-center items-center h-full p-3 cursor-pointer group-focus-within:text-gray-400"
                                >
                                    <FaArrowLeft size={22} />
                                </button>
                            ) : (
                                <button
                                    onClick={redToSearch}
                                    className="flex justify-center items-center h-full p-3 cursor-pointer group-focus-within:text-gray-400"
                                >
                                    <IoSearch size={22} />
                                </button>
                            )

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
                                        type="text"
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder='Search for Milk Bread and more...'
                                        autoFocus
                                        defaultValue={sText}
                                        className='bg-transparent w-full h-full outline-none'
                                        onChange={handleOnchange}
                                    />
                                </div>
                            )
                    }
                </div>

            </div >
        </>
    )
}

export default Search
