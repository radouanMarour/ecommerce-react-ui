import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utils/axios";

export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await instance.get('/categories');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch categories');
        }
    }
)

export const fetchCategoryById = createAsyncThunk(
    'category/fetchCategoryById',
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await instance.get(`/categories/${categoryId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch category');
        }
    }
)

export const createCategory = createAsyncThunk(
    'category/createCategory',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await instance.post('/categories', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to create category');
        }
    }
)

export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async ({ categoryId, formData }, { rejectWithValue }) => {
        try {
            const response = await instance.put(`/categories/${categoryId}`, formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update category');
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await instance.delete(`/categories/${categoryId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to delete category');
        }
    }
)