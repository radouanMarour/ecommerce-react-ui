import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utils/axios";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await instance.post('/auth/login', { email, password });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await instance.post('/auth/register', formData);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response?.data || 'Registration failed');
        }
    }
);