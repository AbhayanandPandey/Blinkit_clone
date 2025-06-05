import logo from '../assets/abc1.jpg'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from 'react-icons/fa6'
import useMobile from '../hooks/useMobile'
import { BsCart4 } from 'react-icons/bs'
function header() {
  const [isMobile] = useMobile()
  const location = useLocation()
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/login')
  }
  const isSearchPage = location.pathname === '/search'
  return (
    <header className=' h-28 lg:h-20  sticky top-0 flex items-center flex-col lg:shadow  lg:pb-0 bg-white'>
      {
        !(isSearchPage && isMobile) && (
          <div className='container flex items-center h-full lg:py-4 justify-between pb-1 pt-0 pl-3 pr-3 mx-1'>
            <div className='' >
              <Link to={"/"} className=' flex justify-center items-center'>
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
              <button className='text-neutral-600 lg:hidden'>
                <FaRegCircleUser size={26} />
              </button>
              <div className='hidden lg:flex items-center gap-6'>
                <button onClick={handleLogin} className='cursor-pointer text-lg px-2'> Login</button>
                <button className='flex items-center gap-2 bg-green-700 px-3 py-2 rounded text-white cursor-pointer hover:bg-green-600'>
                  <div className='cursor-pointer animate-bounce'>
                    <BsCart4 size={28} />
                  </div>
                  <div className='font-semibold'>
                    <p>My Cart</p>
                  </div>
                </button>
              </div>
            </div>

          </div>
        )
      }

      <div className='w-full h-auto pb-2 bg-transparent flex justify-center items-center'>
        <div className={`container mx-auto px-2 lg:hidden ${location.pathname === '/search' ? 'mt-9' : 'mt-0'}`}>
          <Search />
        </div>

      </div>
    </header>
  )
}

export default header
