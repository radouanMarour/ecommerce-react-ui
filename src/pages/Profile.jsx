import React, { useState } from 'react';
import '../styles/Profile.css';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        address: '123 Fashion St, New York, NY',
    });

    const [orderHistory] = useState([
        { orderId: 'ORD001', date: '2023-11-20', status: 'Delivered' },
        { orderId: 'ORD002', date: '2023-11-15', status: 'In Progress' },
        { orderId: 'ORD003', date: '2023-11-10', status: 'Cancelled' },
    ]);

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleUpdateInfo = () => {
        alert('Profile information updated successfully!');
    };

    const handleChangePassword = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        alert('Password updated successfully!');
    };

    return (
        <div className="profile-page">
            <h1>My Profile</h1>
            <div className="profile-container">
                {/* User Information */}
                <div className="user-info">
                    <h2>Personal Information</h2>
                    <form>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={userInfo.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={userInfo.address}
                                onChange={handleInputChange}
                            />
                        </label>
                    </form>
                    <button className="update-button" onClick={handleUpdateInfo}>
                        Update Info
                    </button>
                </div>

                {/* Order History */}
                <div className="order-history">
                    <h2>Order History</h2>
                    <ul>
                        {orderHistory.map((order) => (
                            <li key={order.orderId}>
                                <span>Order ID: {order.orderId}</span>
                                <span>Date: {order.date}</span>
                                <span>Status: {order.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Change Password */}
                <div className="change-password">
                    <h2>Change Password</h2>
                    <form>
                        <label>
                            Current Password:
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                            />
                        </label>
                        <label>
                            New Password:
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                            />
                        </label>
                        <label>
                            Confirm Password:
                            <input
                                type="password"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                            />
                        </label>
                    </form>
                    <button className="change-password-button" onClick={handleChangePassword}>
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
