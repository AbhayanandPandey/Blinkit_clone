import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategory: [],
  subcategory: [],
  product: [],
  setLoadingCategory: false,
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
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
    setLoadingCategory: (state, action) => {
      state.setLoadingCategory = action.payload;
    },
  },
});

export const { setAllCategory, setSubCategory, setProduct, setLoadingCategory } = ProductSlice.actions;

export default ProductSlice.reducer;
