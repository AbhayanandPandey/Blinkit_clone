import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  allCategory:[],
  subcategory:[],
  product: [],
}

const ProductSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
    },
    setSubCategory: (state, action) => {
      state.subcategory = [...action.payload];
    },
    setProduct: (state, action) => {
      state.product = [...action.payload];
    },
  },
});

export const { setAllCategory, setSubCategory, setProduct } = ProductSlice.actions;

export default ProductSlice.reducer;