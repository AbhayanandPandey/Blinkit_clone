import logo from '../assets/abc.jpg'
import Search from './Search'
import { Link, useLocation } from 'react-router-dom'
import { FaRegCircleUser } from 'react-icons/fa6'
import useMobile from '../hooks/useMobile'
function header() {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === '/search'
  return (
    <header className=' h-32 lg:h-20  sticky top-0 flex items-center flex-col lg:shadow  lg:pb-0'>
      {
        !(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center h-full lg:p-4 justify-between pb-1 pt-0 pl-3 pr-3'>
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
                <FaRegCircleUser size={25} />
              </button>
              <div className='hidden lg:block'>
                login
              </div>
            </div>
          </div>
        )
      }

      <div className='w-full h-full bg-transparent flex justify-center items-center'>
        <div className='container mx-auto px-2 -mt-5 lg:hidden '>
          <Search />
        </div>
      </div>
    </header>
  )
}

export default header
