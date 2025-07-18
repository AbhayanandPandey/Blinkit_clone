import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    id: '',
    name: '',
    email: '',
    avatar: '',
    mobile: '',
    verify_email: '',
    last_login_date: '',
    status: '',
    address_details: [],
    shopping_cart: [],
    orderHistory: [],
    role: '',
    createdAt: '',
    updatedAt: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.id = action.payload?._id;
            state.name = action.payload?.name;
            state.email = action.payload?.email;
            state.avatar = action.payload?.avatar;
            state.mobile = action.payload?.mobile;
            state.verify_email = action.payload?.verify_email;
            state.last_login_date = action.payload?.last_login_date;
            state.status = action.payload?.status; 
            state.address_details = action.payload?.address_details || [];
            state.shopping_cart = action.payload?.shopping_cart || [];
            state.orderHistory = action.payload?.orderHistory || [];
            state.role = action.payload?.role || '';
            state.createdAt = action.payload?.createdAt || '';
            state.updatedAt = action.payload?.updatedAt || '';
        },
        updatedAvatar: (state, action) => {
            state.avatar = action.payload
        },
        logout: (state) => {
            state.id = '';
            state.name = '';
            state.email = '';
            state.avatar = '';
            state.mobile = '';
            state.verify_email = '';
            state.last_login_date = '';
            state.status = '';
            state.address_details = [];
            state.shopping_cart = [];
            state.orderHistory = [];
            state.role = '';
            state.createdAt = '';
            state.updatedAt = '';
        }
    }
});

export const { setUserDetails, logout, updatedAvatar } = userSlice.actions;
export default userSlice.reducer;