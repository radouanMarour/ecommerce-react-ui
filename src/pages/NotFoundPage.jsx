import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <p className="text-2xl font-medium text-gray-600 mb-8">Page Not Found</p>
                <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
                <Link
                    to="/"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
