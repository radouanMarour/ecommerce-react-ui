import React from 'react';

const AdminHome = () => {
    const dashboardData = {
        totalRevenue: 5780,
        newOrders: 23,
        totalUsers: 1230,
        newReviews: 8,
        recentOrders: [
            { _id: 'orderId1', customerName: 'Name1', orderDate: '2024-01-01', totalAmount: 200, orderStatus: 'Pending' },
            { _id: 'orderId2', customerName: 'Name2', orderDate: '2024-01-02', totalAmount: 100, orderStatus: 'Shipped' },
            { _id: 'orderId3', customerName: 'Name3', orderDate: '2024-01-03', totalAmount: 50, orderStatus: 'Delivered' },
            { _id: 'orderId4', customerName: 'Name4', orderDate: '2024-01-04', totalAmount: 150, orderStatus: 'Pending' }
        ],
        topSellingProducts: [
            { _id: 'productId1', name: 'Product 1', imageUrl: '/product-1.jpg', price: 10 },
            { _id: 'productId2', name: 'Product 2', imageUrl: '/product-2.jpg', price: 20 },
            { _id: 'productId3', name: 'Product 3', imageUrl: '/product-3.jpg', price: 30 },
            { _id: 'productId4', name: 'Product 4', imageUrl: '/product-4.jpg', price: 40 },
        ],
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl text-center md:text-left font-semibold mb-4">Dashboard Overview</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {/* Total Revenue */}
                <div className="bg-white shadow-md rounded p-4">
                    <h3 className="text-lg font-medium mb-2">Total Revenue</h3>
                    <p className="text-3xl font-bold text-gray-700">${dashboardData.totalRevenue}</p>
                </div>

                {/* New Orders */}
                <div className="bg-white shadow-md rounded p-4">
                    <h3 className="text-lg font-medium mb-2">New Orders</h3>
                    <p className="text-3xl font-bold text-gray-700">{dashboardData.newOrders}</p>
                </div>

                {/* Total Users */}
                <div className="bg-white shadow-md rounded p-4">
                    <h3 className="text-lg font-medium mb-2">Total Users</h3>
                    <p className="text-3xl font-bold text-gray-700">{dashboardData.totalUsers}</p>
                </div>
                {/* New Reviews */}
                <div className="bg-white shadow-md rounded p-4">
                    <h3 className="text-lg font-medium mb-2">New Reviews</h3>
                    <p className="text-3xl font-bold text-gray-700">{dashboardData.newReviews}</p>
                </div>

            </div>

            {/* Recent Orders */}
            <div className="bg-white shadow-md rounded p-4 mb-6">
                <h3 className="text-xl font-medium mb-4">Recent Orders</h3>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Order ID</th>
                                <th className="px-4 py-2 text-left">Customer</th>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Amount</th>
                                <th className="px-4 py-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{order._id}</td>
                                    <td className="border px-4 py-2">{order.customerName}</td>
                                    <td className="border px-4 py-2">{order.orderDate}</td>
                                    <td className="border px-4 py-2">${order.totalAmount}</td>
                                    <td className="border px-4 py-2">{order.orderStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Top selling products */}
            <div className="bg-white shadow-md rounded p-4">
                <h3 className="text-xl font-medium mb-4">Top Selling Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {dashboardData.topSellingProducts.map((product) => (
                        <div key={product._id} className="border rounded p-2 text-center">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-contain mb-2" />
                            <h4 className="text-sm font-semibold">{product.name}</h4>
                            <p className="text-gray-700 text-sm">${product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminHome;