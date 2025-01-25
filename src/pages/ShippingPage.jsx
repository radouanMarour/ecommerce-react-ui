import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../redux/slices/cartSlice'
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
    const { shippingAddress } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [shippingData, setShippingData] = useState({
        name: shippingAddress.name || '',
        address: shippingAddress.address || '',
        city: shippingAddress.city || '',
        state: shippingAddress.state || '',
        postalCode: shippingAddress.postalCode || '',
        country: shippingAddress.country || '',
        phoneNumber: shippingAddress.phoneNumber || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingData({
            ...shippingData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress(shippingData))
        navigate('/checkout/payment')
    };

    return (
        <div className="container mx-auto p-4 md:w-1/2">
            <CheckoutSteps currentStep={0} />
            <h2 className="text-2xl text-gray-700 font-bold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={shippingData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={shippingData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        value={shippingData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State/Province</label>
                    <input
                        type="text"
                        name="state"
                        id="state"
                        value={shippingData.state}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        value={shippingData.postalCode}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        value={shippingData.country}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={shippingData.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Continue
                </button>
            </form>
        </div>
    );
};

export default ShippingPage;
