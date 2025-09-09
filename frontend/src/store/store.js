import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import productReducer from '../store/ProductSlice'
import cartProductReducer from './CartProduct'
import addressReducer from './addressSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cartItem : cartProductReducer,
    addresses : addressReducer
  },
})