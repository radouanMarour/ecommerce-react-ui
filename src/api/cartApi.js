import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utils/axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (token, { rejectWithValue }) => {
    try {
        const response = await instance.get("/cart", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
});

export const addToCart = createAsyncThunk("cart/addToCart", async ({ token, item }, { rejectWithValue }) => {
    try {
        // console.log(token)
        const response = await instance.post("/cart", item, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add item to cart");
    }
});

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ token, itemId, body }, { rejectWithValue }) => {
    try {
        const response = await instance.put(`/cart/${itemId}`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update item in cart");
    }
});

export const deleteCartItem = createAsyncThunk("cart/deleteCartItem", async ({ token, itemId }, { rejectWithValue }) => {
    try {
        const response = await instance.delete(`/cart/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete item from cart");
    }
});

export const clearCart = createAsyncThunk("cart/clearCart", async (token, { rejectWithValue }) => {
    try {
        const response = await instance.put("/cart", {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to clear cart");
    }
});


