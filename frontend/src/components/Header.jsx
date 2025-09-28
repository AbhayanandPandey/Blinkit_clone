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
import CartPageDataLg from './CartPageDataLg'

function Header() {
  const [isMobile] = useMobile()
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user)
  const [openUser, setOpenUser] = useState(false)
  const cartItem = useSelector(state => state.cartItem.cartProducts)
  const { notDiscountPrice, totoalPrice, totalQty, fetchCartItems } = useGlobal()
  const [openCartSection, setOpenCartSection] = useState(false)

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

  useEffect(() => {
    if (!user.id) {
      fetchCartItems()
    }
  }, [cartItem, totoalPrice])

  const getServiceChargeRate = (price) => {
    if (price <= 200) return 0.085;
    if (price > 200 && price <= 400) return 0.07;
    if (price > 400 && price <= 1000) return 0.06;
    return 0.01;
  };

  const couponDiscount = 0;
  const finalPrice = Math.max(totoalPrice - couponDiscount, 0);
  const serviceCharge = finalPrice * getServiceChargeRate(finalPrice);
  const grandTotal = finalPrice + serviceCharge;

  return (
    <header className=' h-28 lg:h-20 sticky top-0 flex items-center flex-col lg:shadow lg:pb-0 bg-white z-10'>
      {
        !(isSearchPage && isMobile) && (
          <div className='w-full flex items-center h-full lg:py-4 justify-between pb-1 pt-0 pl-4 lg:pl-7 lg:pr-10 pr-4 mx-1'>
            <div>
              <Link to={"/"} className=' flex justify-center items-center mix-blend-multiply'>
                <img
                  src={logo}
                  width={130}
                  height={60}
                  alt='logo'
                  className='bg mix-blend-multiply hidden lg:block mt-2'
                />
                <img
                  src={logo}
                  width={90}
                  height={60}
                  alt='logo'
                  className='bg mix-blend-multiply lg:hidden mt-2'
                />
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
                        <p className="font-semibold text-gray-800">Account</p>
                        {
                          openUser ? (
                            <GoTriangleUp size={22} />
                          ) : (
                            <GoTriangleDown size={22} />
                          )
                        }
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

                <button
                  onClick={() => setOpenCartSection(true)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer text-white font-medium 
             bg-gradient-to-r from-green-500 to-green-700 
             shadow-md hover:shadow-lg 
             hover:from-green-700 hover:to-green-800 
             transform hover:scale-103 
             transition-all duration-300 ease-in-out"
                >
                  <div className="cursor-pointer animate-bounce">
                    <BsCart4 size={26} />
                  </div>
                  {cartItem[0] ? (
                    <div className="text-left">
                      <p className="text-sm">{totalQty} Items</p>
                      <p className="text-base font-semibold">{grandTotal.toFixed(2)} ₹</p>
                    </div>
                  ) : (
                    <div className="font-semibold py-2">
                      <p>My Cart</p>
                    </div>
                  )}
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

      {
        openCartSection && (
          <CartPageDataLg close={() => setOpenCartSection(false)} />
        )
      }
    </header>
  )
}

export default Header
