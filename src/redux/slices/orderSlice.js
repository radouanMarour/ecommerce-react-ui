import { createSlice } from '@reduxjs/toolkit';
import * as orderApi from '../../api/orderApi'

const initialState = {
    order: null,
    orders: [],
    loading: false,
    error: null,
    message: ''
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearOrder: (state) => {
            state.order = null;
            state.error = null;
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(orderApi.placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(orderApi.placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(orderApi.placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(orderApi.fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(orderApi.fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(orderApi.fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(orderApi.fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(orderApi.fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(orderApi.fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(orderApi.payOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(orderApi.payOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(orderApi.payOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(orderApi.deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).
            addCase(orderApi.markOrderAsDelivered.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(orderApi.markOrderAsDelivered.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(orderApi.markOrderAsDelivered.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(orderApi.deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter((order) => order._id !== action.payload.orderId);
                state.message = action.payload.message
            })
            .addCase(orderApi.deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(orderApi.fetchMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(orderApi.fetchMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(orderApi.fetchMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
    }
})

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer