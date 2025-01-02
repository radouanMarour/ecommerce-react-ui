import { NavigateBefore } from '@mui/icons-material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ homeLabel = 'Home' }) => {
    const location = useLocation();
    const pathSegments = location.pathname
        .split('/')
        .filter(Boolean)
        .map((segment, index, arr) => ({
            name: segment.replace(/[-_]/g, ' '),
            path: `/${arr.slice(0, index + 1).join('/')}`,
        }));


    const breadcrumbs = [
        { name: homeLabel, path: '/' },
        ...pathSegments,
    ];

    return (
        <nav aria-label="breadcrumb" className="h-4 mx-6 mb-4 pt-4 md:pt-20">
            <ol className="flex items-center text-sm text-gray-500">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index} className="flex items-center">
                        <Link to={breadcrumb.path} className="hover:text-blue-600">
                            {breadcrumb.name}
                        </Link>
                        {index < breadcrumbs.length - 1 && (
                            <span className=""><NavigateBefore /></span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;