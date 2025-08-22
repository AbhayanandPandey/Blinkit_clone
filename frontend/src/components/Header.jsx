import logo from '../assets/abc2.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from 'react-icons/fa6'
import useMobile from '../hooks/useMobile'
import { BsCart4 } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import { useGlobal } from '../provider/GlobalProvider'
function Header() {
  const [isMobile] = useMobile()
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user)
  const [openUser, setOpenUser] = useState(false)
  const cartItem = useSelector(state => state.cartItem.cartProducts)
  const {totoalPrice, totalQty} = useGlobal()


  const handleLogin = () => {
    navigate('/login')
  }
  const handleClose = () => {
    setOpenUser(false)
  }
  const isSearchPage = location.pathname === '/search'

  const handleMobile = () => {
    if (!user.id) {
      navigate('/login')
      return
    }
    navigate('/user')
  }

  return (
    <header className=' h-28 lg:h-20  sticky top-0 flex items-center flex-col lg:shadow  lg:pb-0 bg-white z-10'>
      {
        !(isSearchPage && isMobile) && (
          <div className='w-full flex items-center h-full lg:py-4 justify-between pb-1 pt-0 pl-4 lg:pl-7 lg:pr-10 pr-4 mx-1'>
            <div className='' >
              <Link to={"/"} className=' flex justify-center items-center mix-blend-multiply'>
                <img
                  src={logo}
                  width={130}
                  height={60}
                  alt='logo'
                  className='bg mix-blend-multiply hidden lg:block mt-2'
                >
                </img>
                <img
                  src={logo}
                  width={90}
                  height={60}
                  alt='logo'
                  className='bg mix-blend-multiply lg:hidden mt-2'
                >
                </img>
              </Link>
            </div>

            <div className='hidden lg:block'>
              <Search />
            </div>

            <div>
              <button className='text-neutral-600 lg:hidden' onClick={handleMobile}>
                <FaRegCircleUser size={25} />
              </button>
              <div className='hidden lg:flex items-center gap-6'>
                {
                  user?.id ? (
                    <div className=' relative'>
                      <div onClick={() => setOpenUser(preve => !preve)} className='flex items-center gap-2 cursor-pointer'>
                        <p>
                          Account
                        </p>
                        {
                          openUser ? (
                            <GoTriangleUp size={22} />

                          ) : (

                            <GoTriangleDown size={22} />
                          )
                        }

                        <p></p>
                      </div>
                      {
                        openUser && (
                          <div className='absolute right-0 h-20 top-12 bg-white'>
                            <div className='bg bg-white rounded p-4 min-w-62 lg:shadow-lg relative min-h-fit '>
                              <UserMenu close={handleClose} />
                            </div>
                          </div>
                        )
                      }

                    </div>
                  ) : (

                    <button onClick={handleLogin} className='cursor-pointer text-lg px-2'> Login</button>
                  )
                }
                <button className='flex items-center gap-2 bg-green-700 px-3 py-1 rounded text-white cursor-pointer hover:bg-green-600'>
                  <div className='cursor-pointer animate-bounce'>
                    <BsCart4 size={26 } />
                  </div>
                  {
                    cartItem[0] ? (
                      <div>
                        <p>
                          {totalQty} Items
                        </p>
                        <p>
                          {totoalPrice} ₹
                        </p>

                      </div>
                    ) : (
                      <div className='font-semibold py-2'>
                        <p>My Cart</p>
                      </div>
                    )
                  }
                </button>
              </div>
            </div>

          </div>
        )
      }

      <div className='w-full h-auto pb-4 bg-transparent flex justify-center items-center'>
        <div className={`w-full px-4 mx-auto lg:hidden ${location.pathname === '/search' ? 'mt-9' : 'mt-0'}`}>
          <Search />
        </div>

      </div>
    </header>
  )
}

export default Header 
