import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../redux/slices/cartSlice'
import paypalLogo from '../assets/paypal.png'
import stripeLogo from '../assets/stripe.png'
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';


const PaymentPage = () => {
    const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);
    const [method, setMethod] = useState(paymentMethod || 'paypal');
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(shippingAddress).length === 0) {
            navigate('/checkout/shipping')
        }
    }, [shippingAddress, navigate])


    const handleChange = (e) => {
        setMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(method))
        navigate('/checkout/placeorder')
    };

    return (
        <div className="container mx-auto p-4 md:w-1/2">
            <CheckoutSteps currentStep={1} />
            <h2 className="text-2xl text-gray-700 font-bold mb-4">Select Payment Method</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="paypal"
                                name="paymentMethod"
                                value="paypal"
                                checked={method === 'paypal'}
                                onChange={handleChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                                <img src={paypalLogo} alt='paypal-logo' className='w-28 object-contain' />
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="stripe"
                                name="paymentMethod"
                                value="stripe"
                                checked={method === 'stripe'}
                                onChange={handleChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <label htmlFor="stripe" className="ml-3 block text-sm font-medium text-gray-700">
                                <img src={stripeLogo} alt='stripe-logo' className='w-28 object-contain' />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-4"
                    >
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentPage;