import { createSlice } from '@reduxjs/toolkit';
import * as productApi from '../../api/productApi';

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    message: ''
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearMessage(state) {
            state.message = '';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(productApi.fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(productApi.fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(productApi.fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            // Fetch product by ID
            .addCase(productApi.fetchProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(productApi.fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(productApi.fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            // Create product
            .addCase(productApi.createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(productApi.createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(productApi.createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            // Update product
            .addCase(productApi.updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(productApi.updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload
                state.products = state.products.map(
                    product => product._id === updatedProduct._id ? updatedProduct : product
                )
                state.message = action.payload.message;
            })
            .addCase(productApi.updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            // Delete product
            .addCase(productApi.deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(productApi.deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((product) => product._id !== action.payload);
                state.message = action.payload.message;
            })
            .addCase(productApi.deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(productApi.addProductReview.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(productApi.addProductReview.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload
            })
            .addCase(productApi.addProductReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error
            });
    }
});

export const { clearMessage } = productSlice.actions;

export default productSlice.reducer;