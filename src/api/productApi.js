import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utils/axios";

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (params, { rejectWithValue }) => {
        try {
            let response;
            if (params) {
                response = await instance.get(`/products?${params.toString()}`);
            } else {
                response = await instance.get('/products');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch products');
        }
    }
)

export const fetchProductById = createAsyncThunk(
    'product/fetchProductById',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await instance.get(`/products/${productId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch Product');
        }
    }
)

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await instance.post('/products', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to create Product');
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ productId, formData }, { rejectWithValue }) => {
        try {
            const response = await instance.put(`/products/${productId}`, formData);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            // console.log(error.response?.data);
            return rejectWithValue(error.response?.data || 'Failed to update Product');
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await instance.delete(`/products/${productId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to delete Product');
        }
    }
)
