//categorySlice.js
import { createSlice } from '@reduxjs/toolkit';
import * as categoryApi from '../../api/categoryApi';

const initialState = {
    categories: [],
    category: null,
    loading: false,
    error: null,
    message: ''
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        clearMessage(state) {
            state.message = '';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch categories
            .addCase(categoryApi.fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(categoryApi.fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(categoryApi.fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            // Fetch category by ID
            .addCase(categoryApi.fetchCategoryById.pending, (state) => {
                state.loading = true;
            })
            .addCase(categoryApi.fetchCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(categoryApi.fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            // Create category
            .addCase(categoryApi.createCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(categoryApi.createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(categoryApi.createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            // Update category
            .addCase(categoryApi.updateCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(categoryApi.updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                const updatedCategory = action.payload.category
                state.categories = state.categories.map(
                    category => category._id === updatedCategory.id ? updatedCategory : category
                )
                state.message = action.payload.message;
            })
            .addCase(categoryApi.updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            // Delete category
            .addCase(categoryApi.deleteCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(categoryApi.deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.categories = state.categories.filter((category) => category._id !== action.payload.categoryId);
            })
            .addCase(categoryApi.deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            });
    }
});

export const { clearMessage } = categorySlice.actions;

export default categorySlice.reducer;