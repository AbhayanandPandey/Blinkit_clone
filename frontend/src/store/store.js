import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import productReducer from '../store/ProductSlice'
import cartProductReducer from './CartProduct'
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cartItem : cartProductReducer
  },
})