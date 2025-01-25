import { createSlice } from "@reduxjs/toolkit";
import * as cartApi from "../../api/cartApi";

const initialState = {
    items: [],
    total: 0,
    shippingAddress: localStorage.getItem("shippingAddress")
        ? JSON.parse(localStorage.getItem("shippingAddress"))
        : {},
    paymentMethod: localStorage.getItem("paymentMethod") || "paypal",
    loading: false,
    error: null,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        saveShippingAddress(state, action) {
            state.shippingAddress = action.payload;
            localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
        },
        savePaymentMethod(state, action) {
            state.paymentMethod = action.payload;
            localStorage.setItem("paymentMethod", action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(cartApi.fetchCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cartApi.fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(cartApi.fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(cartApi.addToCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cartApi.addToCart.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(cartApi.addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(cartApi.updateCartItem.pending, (state, action) => {
                // state.loading = true;
                state.error = null;
            })
            .addCase(cartApi.updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(cartApi.updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(cartApi.deleteCartItem.pending, (state, action) => {
                // state.loading = true;
                state.error = null;
            })
            .addCase(cartApi.deleteCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(cartApi.deleteCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(cartApi.clearCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cartApi.clearCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(cartApi.clearCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
    }
})

export const { saveShippingAddress, savePaymentMethod } = cartSlice.actions

export default cartSlice.reducer;


