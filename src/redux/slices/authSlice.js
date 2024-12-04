import { createSlice } from '@reduxjs/toolkit'
import { loginAsync, signupAsync } from '../../api/authApi';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '../../localStorage'

const initialState = {
    isAuthenticated: getFromLocalStorage('isAuthenticated') || false,
    user: getFromLocalStorage('user') || null,
    token: getFromLocalStorage('token') || null,
    status: 'idle',
    error: null,
    message: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clear(state) {
            state.error = null,
                state.message = null
        },
        logout(state) {
            state.isAuthenticated = false
            state.user = null
            state.token = null
            state.status = 'idle'

            removeFromLocalStorage('isAuthenticated')
            removeFromLocalStorage('user')
            removeFromLocalStorage('token')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.pending, (state) => {
            state.status = "pending"
            state.isAuthenticated = false;
        })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.isAuthenticated = true;
                state.user = action.payload.data;
                state.token = action.payload.token

                saveToLocalStorage('isAuthenticated', true)
                saveToLocalStorage('user', action.payload.data)
                saveToLocalStorage('token', action.payload.token)
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = "failed"
                state.isAuthenticated = false;
                state.error = action.payload.message
            })
            .addCase(signupAsync.pending, (state) => {
                state.status = "pending"
            })
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.message = action.payload.message
            })
            .addCase(signupAsync.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload.message
            })
    }
})

export const { clear, logout } = authSlice.actions

export default authSlice.reducer;