import React, { useState } from 'react';
import '../styles/Profile.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState('profile');
    const [orderHistory] = useState([
        { orderId: 'ORD001', date: '2023-11-20', status: 'Delivered', amount: '$120' },
        { orderId: 'ORD002', date: '2023-11-15', status: 'In Progress', amount: '$80' },
        { orderId: 'ORD003', date: '2023-11-10', status: 'Cancelled', amount: '$50' },
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        user[name] = value; // Note: This is a simplified update; in a real app, use Redux
    };

    const handleUpdateInfo = () => {
        alert('Profile information updated successfully!');
    };

    return (
        <div className="profile-page">
            {/* Tab Navigation */}
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile Info
                </button>
                <button
                    className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    Order History
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'profile' && (
                    <div className="profile-info">
                        <h2>Personal Information</h2>
                        <form>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name || ''}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email || ''}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Address:
                                <input
                                    type="text"
                                    name="address"
                                    value={user.address || ''}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </form>
                        <button className="update-button" onClick={handleUpdateInfo}>
                            Update Info
                        </button>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="order-history">
                        <h2>Order History</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Paid</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderHistory.map((order) => (
                                    <tr key={order.orderId}>
                                        <td>{order.orderId}</td>
                                        <td>{order.date}</td>
                                        <td>{order.amount}</td>
                                        <td>Paid at </td>
                                        <td>{order.status}</td>
                                        <td><Link to={`/order/${order.orderId}`}>View Details</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;