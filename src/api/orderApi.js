import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utils/axios";

export const placeOrder = createAsyncThunk("order/placeOrder",
    async ({ token, orderData }, { rejectWithValue }) => {
        try {
            const response = await instance.post("/orders", orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to place order");
        }
    });

export const fetchOrderById = createAsyncThunk("order/fetchOrderById",
    async ({ token, orderId }, { rejectWithValue }) => {
        console.log({ token, orderId })
        try {
            const response = await instance.get(`/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.data)
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch order");
        }
    });

export const fetchOrders = createAsyncThunk("order/fetchOrders",
    async (token, { rejectWithValue }) => {
        try {
            const response = await instance.get(`/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch orders");
        }
    });

export const fetchMyOrders = createAsyncThunk("order/fetchMyOrders",
    async (token, { rejectWithValue }) => {
        try {
            const response = await instance.get(`/orders/myorders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.data)
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch orders");
        }
    });

export const payOrder = createAsyncThunk("order/payOrder",
    async ({ token, orderId, paymentResult }, { rejectWithValue }) => {
        try {
            const response = await instance.put(`/orders/${orderId}/pay`, { paymentResult }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to process payment");
        }
    });

export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await instance.delete(`/orders/${orderId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to delete order');
        }
    }
);

export const markOrderAsDelivered = createAsyncThunk(
    'order/deliver',
    async ({ token, orderId }, { rejectWithValue }) => {
        try {
            const response = await instance.put(`/orders/${orderId}/deliver`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to deliver order');
        }
    }
);