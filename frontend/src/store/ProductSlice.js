import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  allCategory: [],
  setLoadingCategory: false,
  subCategory: [], // ✅ camelCase 'subCategory'
  product: [],
};

const ProductSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
    },
    setSubCategory: (state, action) => {
      state.subCategory = [...action.payload]; // ✅ matches key in state
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
