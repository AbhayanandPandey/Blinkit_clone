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
        }
    }
});

export const { handleAddItemCart } = cartProductSlice.actions;
export default cartProductSlice.reducer;