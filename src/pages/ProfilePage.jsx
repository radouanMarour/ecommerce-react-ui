import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../api/authApi';
import { fetchMyOrders } from '../api/orderApi';
import Loader from '../components/Loader';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const { orders, loading, error } = useSelector((state) => state.order);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        dispatch(fetchMyOrders(token))
    }, [user]);


    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                password: '',
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile({ token, formData }));
        setIsEditing(false);
    };

    if (loading) return <Loader />;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {isEditing && (
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order History</h3>
                            {orders?.length > 0 ? (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order._id} className="border rounded-md p-4">
                                            <div className="flex justify-between">
                                                <span className="font-medium">Order #{order._id}</span>
                                                <span className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="mt-2 text-gray-600">
                                                Status: {order.isPaid ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Paid
                                                    </span>
                                                ) : (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        Not Paid
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No orders found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
