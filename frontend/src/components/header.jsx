import logo from '../assets/logo1.jpg'
import Search from './Search'
import { Link, useLocation } from 'react-router-dom'
import {FaRegCircleUser} from 'react-icons/fa6'
import useMobile from '../hooks/useMobile'
function header() {
  const [isMobile] = useMobile()
  const location  = useLocation()
  const isSearchPage = location.pathname==='/search'
  console.log('m',isMobile)
  return (
    <header className=' h-auto lg:h-20  sticky top-0 flex items-center flex-col pb-3 lg:pb-0'>
      <div className='container mx-auto flex items-center h-full lg:p-4 justify-between mt-0 pb-1 pt-4 pl-3 pr-3'>
        <div className='h-full' >
          <Link to={"/"} className='h-full flex justify-center items-center'>
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
      <div className='w-full h-full bg-white'>
        <div className='container mx-auto px-2 lg:hidden pb-2'>
        <Search />
      </div>
      </div>
    </header>
  )
}

export default header
