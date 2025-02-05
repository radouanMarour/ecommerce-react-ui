import React, { useEffect } from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { fetchUsers, deleteUser } from '../../api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';

const AdminUsers = () => {
    const { token, users, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers(token));
    }, [dispatch, token]);

    const handleDelete = async (userId) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) {
            dispatch(deleteUser({ token, userId }));
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

            <div className="bg-white shadow-md rounded p-4 mb-6">
                <h3 className="text-xl font-medium mb-4">Users</h3>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Username</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Role</th>
                                <th className="px-4 py-2 text-left">Created At</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{user._id}</td>
                                    <td className="border px-4 py-2">{user.username}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.role}</td>
                                    <td className="border px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="text-red-500 hover:text-red-700"
                                            disabled={user.role === 'admin'}
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

export default AdminUsers;
