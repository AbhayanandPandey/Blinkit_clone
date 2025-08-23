import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
};

const cartProductSlice = createSlice({
  name: "cartProduct",
  initialState,
  reducers: {
    handleAddItemCart: (state, action) => {
      state.cartProducts = [...action.payload];
    },
    clearCart: (state) => {
      state.cartProducts = [];
    },
  },
});

export const { handleAddItemCart, clearCart } = cartProductSlice.actions;
export default cartProductSlice.reducer;
