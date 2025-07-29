import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import Api from './config/Api';
import { setAllCategory, setLoadingCategory, setSubCategory } from './store/ProductSlice';
import AxiosToastError from './utils/AxiosToastError';
import FullPageLoader from './components/FullPageLoader';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const fetchUserData = await fetchUserDetails();
      dispatch(setUserDetails(fetchUserData.data));
    } catch (error) {}
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({ ...Api.getCategories });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data || []));
      } else {
        dispatch(setAllCategory([]));
      }
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
      if (responseData.success) {
        dispatch(setSubCategory(responseData.data || []));
      } else {
        dispatch(setSubCategory([]));
      }
    } catch (error) {
      AxiosToastError(error);
      dispatch(setSubCategory([]));
    }
  };

  useEffect(() => {
    const loadApp = async () => {
      await Promise.all([fetchUser(), fetchCategory(), fetchSubCategory()]);
      setLoading(false);
    };
    loadApp();
  }, []);

  if (loading) return <FullPageLoader />;

  return (
    <>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
