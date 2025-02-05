import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { notifyError, notifySuccess } from "../utils/notifications";
import instance from "../utils/axios";
import { payOrder } from "../api/orderApi";
import { clearCart } from "../api/cartApi";
import { useNavigate } from "react-router-dom";

const PayPalCheckoutButtons = ({ amount, orderId }) => {
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialOptions = {
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        "enable-funding": "venmo",
        "buyer-country": "US",
        currency: "USD",
        components: "buttons",
    };

    const handleCreateOrder = async () => {
        try {
            const response = await instance.post('/paypal/create-order',
                { amount },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data.data.id;
        } catch (err) {
            notifyError(err.response?.data?.message || 'Failed to create order');
            throw new Error('Failed to create order');
        } finally {
        }
    };

    const handleApprove = async (data, actions) => {
        try {
            const response = await instance.post('/paypal/capture-order',
                {
                    orderId: data.orderID
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.data.paymentResult.status === "COMPLETED") {
                const paymentResult = response.data.data.paymentResult
                dispatch(payOrder({ token, orderId, paymentResult }))
                dispatch(clearCart(token))
                navigate(`/admin/dashboard/orders/${orderId}`)
                notifySuccess('Payment successful!');
            }
        } catch (err) {
            notifyError(err.response?.data?.message || 'Payment failed');
        } finally {
        }
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
                style={{
                    shape: "rect",
                    layout: "vertical",
                    color: "gold",
                    label: "paypal",
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalCheckoutButtons;
