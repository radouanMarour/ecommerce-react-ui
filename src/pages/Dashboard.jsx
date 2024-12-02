import React from 'react';
import '../styles/Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const stats = {
        totalSales: '$15,234',
        totalOrders: 154,
        totalProducts: 87,
        totalUsers: 324,
    };

    const recentOrders = [
        { id: 'ORD001', customer: 'John Doe', amount: '$120.50', date: '2023-12-01' },
        { id: 'ORD002', customer: 'Jane Smith', amount: '$80.99', date: '2023-11-30' },
        { id: 'ORD003', customer: 'Michael Brown', amount: '$45.00', date: '2023-11-29' },
    ];

    return (
        <div className="dashboard-page">
            <h1>Admin Dashboard</h1>

            {/* Statistics Overview */}
            <div className="stats-overview">
                <div className="stat-card">
                    <h2>Total Sales</h2>
                    <p>{stats.totalSales}</p>
                </div>
                <div className="stat-card">
                    <h2>Total Orders</h2>
                    <p>{stats.totalOrders}</p>
                </div>
                <div className="stat-card">
                    <h2>Total Products</h2>
                    <p>{stats.totalProducts}</p>
                </div>
                <div className="stat-card">
                    <h2>Total Users</h2>
                    <p>{stats.totalUsers}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="actions-grid">
                    <Link to="/admin/create-product" className="action-card">
                        Add New Product
                    </Link>
                    <Link to="/admin/manage-products" className="action-card">
                        Manage Products
                    </Link>
                    <Link to="/admin/orders" className="action-card">
                        View Orders
                    </Link>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="recent-orders">
                <h2>Recent Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.amount}</td>
                                <td>{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
