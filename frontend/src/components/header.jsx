import logo from '../assets/logo1.jpg'
import Search from './Search'
import { Link } from 'react-router-dom'
import {FaRegCircleUser} from 'react-icons/fa6'
function header() {
  return (
    <header className=' h-30 lg:h-20 shadow-md sticky top-0 bg-red-500'>
      <div className='container mx-auto flex items-center h-full p-4 justify-between'>
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
      <div className='container mx-auto px-2'>
        <Search />
      </div>
    </header>
  )
}

export default header
