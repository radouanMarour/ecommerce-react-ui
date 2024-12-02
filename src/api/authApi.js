import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk('auth/login', async (loginData) => {
    try {
        const response = await instance.post('/auth/login', loginData)
        return response.data.data
    } catch (error) {
        console.log(error.response.data.message)
    }
})