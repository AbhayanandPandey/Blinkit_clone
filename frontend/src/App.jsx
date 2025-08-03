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
import Api from './config/Api';
import { setAllCategory, setLoadingCategory, setSubCategory } from './store/ProductSlice';
import AxiosToastError from './utils/AxiosToastError';

// Pages
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
import UserMenuMobile from './pages/UserMenuMobile';
import Dashboard from './layouts/Dashboard';
import UserProfile from './pages/UserProfile';
import MyOrder from './pages/MyOrder';
import Address from './pages/Address';
import Product from './admin/Product';
import SubCategory from './admin/SubCategory';
import Category from './admin/Category';
import UploadProduct from './admin/UploadProduct';
import Fno from './pages/Fno';
import ProductListPage from './pages/ProductListPage';
import ProductDisplayPage from './pages/ProductDisplayPage';

// Routes
import PrivateAdminRoute from './routes/PrivateAdminRoute';
import LoginSignupForgot from './routes/LoginSignupForgot';

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />

          {/* Auth routes inside layout */}
          <Route element={<LoginSignupForgot />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route path="/verify-Otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/user" element={<UserMenuMobile />} />

          {/* Product Pages */}
          <Route path="/product/:product" element={<ProductDisplayPage />} />
          <Route path="/:category/:subcategory" element={<ProductListPage />} />

          {/* Dashboard and nested routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="myorders" element={<MyOrder />} />
            <Route path="myaddress" element={<Address />} />
            <Route path="fno" element={<Fno />} />

            {/* Admin routes */}
            <Route element={<PrivateAdminRoute />}>
              <Route path="product" element={<Product />} />
              <Route path="subcategory" element={<SubCategory />} />
              <Route path="category" element={<Category />} />
              <Route path="upload-product" element={<UploadProduct />} />
            </Route>
          </Route>
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
