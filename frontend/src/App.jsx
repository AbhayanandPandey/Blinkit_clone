import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/FooterTemp.jsx';
import toast, { Toaster } from 'react-hot-toast';
import FullPageLoader from './components/FullPageLoader';
import { useState, useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import { Outlet } from 'react-router-dom';
import Api from './config/Api';
import { setAllCategory, setLoadingCategory, setSubCategory } from './store/ProductSlice';
import AxiosToastError from './utils/AxiosToastError';
import ScrollToTop from './layouts/ScrollToTop.jsx';
import { handleAddItemCart } from './store/CartProduct.js';
import GlobalProvider, { useGlobal } from './provider/GlobalProvider.jsx'
import { FaCartPlus, FaCartShopping } from 'react-icons/fa6';
import CartMobile from './components/CartMobile.jsx';


function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const fetchUserData = await fetchUserDetails();
      dispatch(setUserDetails(fetchUserData.data));
    } catch (error) { }
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({ ...Api.getCategories });
      const { data: responseData } = response;
      dispatch(setAllCategory(responseData.success ? responseData.data : []));
    } catch (error) {
      AxiosToastError(error);
      dispatch(setAllCategory([]));
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({ ...Api.getSubCategories });
      const { data: responseData } = response;
      dispatch(setSubCategory(responseData.success ? responseData.data : []));
    } catch (error) {
      AxiosToastError(error);
      dispatch(setSubCategory([]));
    }
  };


  useEffect(() => {
    const loadApp = async () => {
      await Promise.all([
        fetchUser(),
        fetchCategory(),
        fetchSubCategory(),
      ]);
      setLoading(false);
    };
    loadApp();
  }, []);

  if (loading) return <FullPageLoader />;

  return (
    <GlobalProvider>
      <Header />
      <ScrollToTop />
        <CartMobile />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
        
        
    </GlobalProvider>
  );
}

export default App;
