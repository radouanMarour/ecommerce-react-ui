import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import { clearMessage } from '../redux/slices/authSlice';
import Spinner from '../components/Spinner';
import { notifyError, notifySuccess } from '../utils/notifications';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch()
    const { loading, error, message } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            notifyError(error);
        }
        if (message) {
            notifySuccess(message);
        }
    }, [error, message]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(clearMessage());
        const response = await dispatch(loginUser(formData)).unwrap();
        if (!response.error) {
            navigate('/')
        };
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white flex justify-center items-center bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {loading ? <Spinner /> : 'Login'}
                    </button>
                </form>
                <div className="flex flex-col md:flex-row justify-between mt-4">
                    <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                    </Link>
                    <Link to="/register" className="text-sm text-indigo-600 hover:text-indigo-500">
                        Don't have an account? Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;