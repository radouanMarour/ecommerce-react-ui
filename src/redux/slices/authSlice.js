//authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        }
    }
});

export const { setLoggedIn } = authSlice.actions;
export default authSlice.reducer;