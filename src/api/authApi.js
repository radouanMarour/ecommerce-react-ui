import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";

export const loginAsync = createAsyncThunk('auth/login', async (loginData, { rejectWithValue }) => {
    try {
        const response = await instance.post('/auth/login', loginData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const signupAsync = createAsyncThunk('auth/signup', async (data, { rejectWithValue }) => {
    try {
        const response = await instance.post('auth/signup', data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})