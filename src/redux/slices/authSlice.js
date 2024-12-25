import { createSlice } from '@reduxjs/toolkit';
import * as authApi from '../../api/authApi';
import {
    clearAuthFromLocalStorage,
    loadAuthFromLocalStorage,
    saveAuthToLocalStorage
} from "../../utils/localStorage";

const getInitialState = () => {
    const auth = loadAuthFromLocalStorage();
    return {
        isAuthenticated: auth?.isAuthenticated || false,
        user: auth?.user || null,
        loading: false,
        error: null,
        message: null,
    };
};

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        logoutUser: (state) => {
            clearAuthFromLocalStorage();
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.message = null;
        },
        clearMessage: (state) => {
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authApi.loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authApi.loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user; // Assuming API response includes user
                saveAuthToLocalStorage({ ...action.payload, isAuthenticated: true });
            })
            .addCase(authApi.loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(authApi.registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authApi.registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(authApi.registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            });
    }
});

export const { logoutUser, clearMessage } = authSlice.actions;
export default authSlice.reducer;
