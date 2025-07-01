import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import toast, { Toaster } from 'react-hot-toast'
import fetchUserDetails from './utils/fetchUserDetails'
import { setUserDetails } from './store/userSlice'
import { useDispatch } from 'react-redux'
import Axios from './utils/Axios.js'
import Api from './config/Api.js'
import { setAllCategory } from './store/ProductSlice.js'
import AxiosToastError from './utils/AxiosToastError.js'
import FullPageLoader from './components/FullPageLoader.jsx' 

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const fetchUserData = await fetchUserDetails()
      dispatch(setUserDetails(fetchUserData.data))
    } catch (error) {
    }
  }

  const fetchCategory = async () => {
    try {
      const response = await Axios({ ...Api.getCategories })
      const { data: responseData } = response
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data || []))
      } else {
        dispatch(setAllCategory([]))
      }
    } catch (error) {
      dispatch(setAllCategory([]))
    }
  }

  useEffect(() => {
    const loadApp = async () => {
      await Promise.all([fetchUser(), fetchCategory()])
      setLoading(false)
    }
    loadApp()
  }, [])

  if (loading) return <FullPageLoader /> 

  return (
    <>
      <Header />
      <main className="min-h-[78vh] ">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
