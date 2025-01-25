import React, { useState, useEffect } from 'react';
import instance from '../../utils/axios';
import Loader from '../../components/Loader';
import { AttachMoney, ShoppingBag, People, Inventory } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AdminHome = () => {
    const { token } = useSelector(state => state.auth)
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const sales = [
    //     { "_id": "2025-01-19", "totalRevenue": 200 },
    //     { "_id": "2025-01-20", "totalRevenue": 450 },
    //     { "_id": "2025-01-21", "totalRevenue": 300 },
    //     { "_id": "2025-01-22", "totalRevenue": 370 },
    //     { "_id": "2025-01-23", "totalRevenue": 700 },
    //     { "_id": "2025-01-24", "totalRevenue": 1350 }
    // ]


    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await instance.get('/orders/summary', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSummary(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load summary data');
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
    if (!summary) return null;

    // Prepare chart data
    const chartData = {
        labels: summary.salesChart.map(item => item._id),
        datasets: [{
            label: 'Daily Revenue',
            data: summary.salesChart.map(item => item.totalRevenue),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Revenue Overview'
            }
        }
    };

    return (
        <div className="p-2 sm:p-6 mx-auto w-full max-w-[100vw] overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8">Dashboard Overview</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Total Revenue</p>
                            <h3 className="text-2xl font-bold">${summary.revenue.toFixed(2)}</h3>
                        </div>
                        <AttachMoney className="text-3xl text-green-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Total Users</p>
                            <h3 className="text-2xl font-bold">{summary.customerMetrics.totalUsers}</h3>
                        </div>
                        <People className="text-3xl text-blue-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Total Products</p>
                            <h3 className="text-2xl font-bold">{summary.customerMetrics.totalProducts}</h3>
                        </div>
                        <Inventory className="text-3xl text-purple-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Categories</p>
                            <h3 className="text-2xl font-bold">{summary.customerMetrics.totalCategories}</h3>
                        </div>
                        <ShoppingBag className="text-3xl text-orange-500" />
                    </div>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-8">
                <Line data={chartData} options={chartOptions} />
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold mb-4">Recent Orders</h3>
                <div className="w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-2 sm:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-2 sm:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                <th className="px-2 sm:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-2 sm:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {summary.orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="px-2 sm:px-6 py-2 text-xs sm:text-sm text-gray-900 truncate max-w-[100px]">
                                        {order._id}
                                    </td>
                                    <td className="px-2 sm:px-6 py-2 text-xs sm:text-sm text-gray-900">
                                        ${order.totalPrice}
                                    </td>
                                    <td className="px-2 sm:px-6 py-2">
                                        <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                !order.isPaid ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {!order.isPaid ? "Paid" : "Not Paid"}
                                        </span>
                                    </td>
                                    <td className="px-2 sm:px-6 py-2 text-xs sm:text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Low Stock Products */}
            <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold mb-4">Low Stock Alert</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {summary.lowStock.map((product) => (
                        <div key={product._id} className="border rounded-lg p-3 sm:p-4">
                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                            <p className="text-red-500">Stock: {product.stock} units</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminHome;