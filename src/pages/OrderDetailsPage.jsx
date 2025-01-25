import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchOrderById, markOrderAsDelivered } from '../api/orderApi';
import { clearOrder } from '../redux/slices/orderSlice';
import PayPalCheckoutButtons from '../components/PaypalCheckoutButtons';

const OrderDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { token, user } = useSelector(state => state.auth);
    const { order, loading, error } = useSelector(state => state.order);

    const handleDeliver = async () => {
        dispatch(markOrderAsDelivered({ token, orderId: id }));
        navigate(`/orders/${id}`)
    };

    useEffect(() => {
        dispatch(fetchOrderById({ token, orderId: id }));
        return () => {
            dispatch(clearOrder());
        };
    }, [dispatch, id, token]);


    return loading ? <Loader /> : !order ? <h1>No order found</h1> :
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Order #{order._id}</h2>
                        <div className="space-y-2">
                            <p>Status:
                                <span className={`ml-2 px-2 py-1 rounded ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {order.isPaid ? 'Paid' : 'Not Paid'}
                                </span>
                            </p>
                            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Shipping</h2>
                        <p>{order.shippingAddress.address}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                        <p>{order.shippingAddress.country}</p>
                        {order.isDelivered ? (
                            <p className="mt-2 text-green-600">Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</p>
                        ) : (
                            <p className="mt-2 text-yellow-600">Not Delivered</p>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        <p>{order.paymentMethod}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                        <div className="space-y-4">
                            {order && order.orderItems.map((item) => (
                                <div key={item._id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img
                                            src={item.product.images?.[0]}
                                            alt={item.product.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div className="ml-4">
                                            <h3 className="font-medium">{item.product.name}</h3>
                                            <p className="text-gray-600">
                                                {item.quantity} x ${item.price}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-medium">
                                        ${(item.quantity * item.price).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Items:</span>
                                <span>${order.itemsPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span>${order.shippingPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax:</span>
                                <span>${order.taxPrice.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between font-semibold">
                                    <span>Total:</span>
                                    <span>${order.totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!order.isPaid && <PayPalCheckoutButtons amount={order.totalPrice} orderId={id} />}
                    {user?.role === "admin" && order.isPaid && !order.isDelivered && (
                        <button
                            onClick={handleDeliver}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                        >
                            Mark As Delivered
                        </button>
                    )}
                </div>
            </div>
        </div>
};

export default OrderDetailsPage;