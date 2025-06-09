import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    id: '',
    name: '',
    email: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state = {...action.payload};
        },
        clearUserDetails: (state) => {
            state.id = '';
            state.name = '';
            state.email = '';
        }
    }
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;