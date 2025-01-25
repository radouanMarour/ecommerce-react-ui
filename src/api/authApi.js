import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utils/axios";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await instance.post('/auth/login', { email, password });
            return response.data.data;
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
            return response.data.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response?.data || 'Registration failed');
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async ({ token, formData }, { rejectWithValue }) => {
        try {
            const response = await instance.put('/auth/users/profile', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.data)
            return response.data.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response?.data || 'Registration failed');
        }
    }
);