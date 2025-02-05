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
        token: auth?.token || null,
        loading: false,
        error: null,
        message: null,
        users: []
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
            state.token = null;
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
                state.user = action.payload.user;
                state.token = action.payload.token;
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
            }).
            addCase(authApi.updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authApi.updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.message = action.payload.message;
                saveAuthToLocalStorage({
                    user: action.payload,
                    isAuthenticated: true,
                    token: state.token
                });
            })
            .addCase(authApi.updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(authApi.fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authApi.fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(authApi.fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(authApi.deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authApi.deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user._id !== action.payload.userId);

                state.message = action.payload.message;
            })
            .addCase(authApi.deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
    }
});

export const { logoutUser, clearMessage } = authSlice.actions;
export default authSlice.reducer;
