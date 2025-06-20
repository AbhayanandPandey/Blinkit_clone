import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import fetchUserDetails from './utils/fetchUserDetails'
import { setUserDetails } from './store/userSlice'
import { useDispatch } from 'react-redux'
import Axios from './utils/Axios.js'
import Api from './config/Api.js'
import { setAllCategory } from './store/ProductSlice.js'
import AxiosToastError from './utils/AxiosToastError.js'
function App() {
  const dispatch = useDispatch()
  const fetchUser = async () => {
    const fetchUserData = await fetchUserDetails()
    dispatch(setUserDetails(fetchUserData.data))
  }

   const fetchCategory = async () => {
    try {
      const response = await Axios({ ...Api.getCategories });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data || []))
      } else {
        dispatch(setAllCategory([]))
      }
    } catch (error) {
      dispatch(setAllCategory([]))
    } finally {
    }
  };

  useEffect(() => { 
    fetchUser()
    fetchCategory()
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
