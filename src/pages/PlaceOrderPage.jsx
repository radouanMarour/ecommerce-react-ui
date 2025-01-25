import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import paypalLogo from '../assets/paypal.png'
import stripeLogo from '../assets/stripe.png'
import { fetchCart } from '../api/cartApi';
import Loader from '../components/Loader'
import { placeOrder } from '../api/orderApi';

const PlaceOrderPage = () => {
    const { token } = useSelector(state => state.auth)
    const order = useSelector(state => state.order)
    const { items, loading, shippingAddress, paymentMethod } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const calculations = useMemo(() => {
        if (!items?.length) return null;

        const itemsTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const shipping = itemsTotal > 100 ? 0 : 10;
        const tax = parseFloat(itemsTotal * 0.1).toFixed(2);
        const orderTotal = parseFloat(itemsTotal + shipping + Number(tax)).toFixed(2);

        return {
            itemsTotal,
            shipping,
            tax,
            orderTotal
        };
    }, [items]);

    useEffect(() => {
        if (!paymentMethod) {
            navigate('/checkout/payment');
        } else if (Object.keys(shippingAddress).length === 0) {
            navigate('/checkout/shipping');
        }
    }, [paymentMethod, shippingAddress, navigate]);

    useEffect(() => {
        dispatch(fetchCart(token))
    }, [dispatch, token])

    const handlePlaceOrder = async () => {
        const orderData = {
            orderItems: items,
            shippingAddress,
            paymentMethod,
            itemsPrice: calculations.itemsTotal,
            shippingPrice: calculations.shipping,
            taxPrice: calculations.tax,
            totalPrice: calculations.orderTotal
        };
        const { order } = await dispatch(placeOrder({ token, orderData })).unwrap()
        if (order) {
            navigate(`/orders/${order._id}`)
        }
    };

    if (loading || items.length === 0 || !calculations) {
        return <Loader />
    }

    return (
        <div className="container mx-auto p-4">
            <CheckoutSteps currentStep={3} />
            <h2 className="text-2xl text-center text-gray-700 font-bold mb-4">Review Your Order</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-x-4'>
                <div className="col-start-1 col-end-3">
                    <div className="bg-white p-4 my-2 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                        <p>{shippingAddress.address}</p>
                        <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
                        <p>{shippingAddress.country}</p>
                    </div>
                    <div className="bg-white p-4 my-2 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                        <p>
                            {
                                paymentMethod === "paypal" &&
                                <img src={paypalLogo} alt="paypal-logo" className='w-28 object-contain' />
                            }
                            {
                                paymentMethod === "stripe" &&
                                <img src={stripeLogo} alt="stripe-logo" className='w-28 object-contain' />
                            }
                        </p>
                    </div>
                    <div className="bg-white p-4 my-2 rounded-lg shadow-md md:col-span-2">
                        <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                        <ul>
                            {items?.map((item) => (
                                <li key={item._id} className="flex justify-between cart?.items-center border-b py-2">
                                    <div className="flex cart?.items-center">
                                        <img src={item.product.images?.[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                                        <div className="ml-4">
                                            <p className="font-semibold text-sm md:text-base">{item.product.name}</p>
                                            <p className="text-xs md:text-sm text-gray-600">
                                                Color: {item.color} | Size: {item.size} | Qty: {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-xs md:text-base">Price x Quantity = ${(item.price * item.quantity).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="">
                    <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
                        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                        <div className="flex justify-between cart?.items-center border-b py-2">
                            <p className="font-semibold">Items Total</p>
                            <p className="font-semibold">${calculations.itemsTotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between cart?.items-center border-b py-2">
                            <p className="font-semibold">Shipping</p>
                            <p className="font-semibold">${calculations.shipping.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between cart?.items-center border-b py-2">
                            <p className="font-semibold">Tax</p>
                            <p className="font-semibold">${calculations.tax}</p>
                        </div>
                        <div className="flex justify-between cart?.items-center py-2">
                            <p className="font-semibold">Total</p>
                            <p className="font-semibold">${calculations.orderTotal}</p>
                        </div>
                        <div className="py-2">
                            <button
                                onClick={handlePlaceOrder}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {order.loading ? "Placing order..." : "Place Order"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderPage;
