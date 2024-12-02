import { createSlice } from '@reduxjs/toolkit'
import { loginAsync } from '../../api/authApi';

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: 'idle',
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateProfile(state, action) {
            state.user = { ...state.user, ...action.payload }
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null
            state.token = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.pending, (state) => {
            state.loading = "pending"
            state.isAuthenticated = false;
        })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = "succeeded"
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = "failed"
                state.isAuthenticated = false;
                state.error = action.payload
            })
    }
})

export const { logout, updateProfile } = authSlice.actions

export default authSlice.reducer;