import React, { useEffect } from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { fetchOrders, deleteOrder } from '../../api/orderApi';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';


const AdminOrders = () => {
    const { orders, loading } = useSelector((state) => state.order);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders(token));
    }, [dispatch]);

    const handleDelete = async (orderId) => {
        const confirmed = window.confirm('Are you sure you want to delete this order?');
        if (confirmed) {
            dispatch(deleteOrder({ token, orderId }));
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>

            <div className="bg-white shadow-md rounded p-4 mb-6">
                <h3 className="text-xl font-medium mb-4">Orders</h3>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Buyer</th>
                                <th className="px-4 py-2 text-left">Total</th>
                                <th className="px-4 py-2 text-left">Paid</th>
                                <th className="px-4 py-2 text-left">Delivered</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map(order => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{order._id}</td>
                                    <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2">{order.user.username}</td>
                                    <td className="border px-4 py-2">${order.totalPrice}</td>
                                    <td className="border px-4 py-2">
                                        {order.isPaid ? order.paidAt : "No"}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {order.isDelivered ? "Yes" : "No"}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <Link to={`/admin/dashboard/orders/${order._id}`}
                                            className="text-blue-500 hover:text-blue-700 mr-2"
                                        >
                                            Details
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;