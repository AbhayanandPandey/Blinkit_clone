import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import fetchUserDetails from './utils/fetchUserDetails'
import { setUserDetails } from './store/userSlice'
import { useDispatch } from 'react-redux'
function App() {
  const dispatch = useDispatch()
  const fetchUser = async () => {
    const fetchUserData = await fetchUserDetails()
    dispatch(setUserDetails(fetchUserData.data))
  }
  useEffect(() => { 
    fetchUser()
  },[])
  return (
    <>
      <Header />
      <main className='min-h-[78vh]'>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
