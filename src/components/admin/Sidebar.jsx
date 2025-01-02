import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    Home as HomeIcon,
    Category as CategoryIcon,
    ShoppingCart as ShoppingCartIcon,
    People as PeopleIcon,
} from '@mui/icons-material';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Define the menu items in an array
    const menuItems = [
        { name: 'Home', path: '/dashboard', icon: <HomeIcon className="md:mr-2" /> },
        { name: 'Products', path: '/dashboard/products', icon: <ShoppingCartIcon className="md:mr-2" /> },
        { name: 'Categories', path: '/dashboard/categories', icon: <CategoryIcon className="md:mr-2" /> },
        { name: 'Orders', path: '/dashboard/orders', icon: <ShoppingCartIcon className="md:mr-2" /> },
        { name: 'Users', path: '/dashboard/users', icon: <PeopleIcon className="md:mr-2" /> },
    ];

    return (
        <aside
            className={`fixed bottom-0 left-0 w-full h-12 md:sticky md:h-full md:mt-8 bg-white shadow-md transition-width duration-300 ${isCollapsed ? 'md:w-16' : 'md:w-64'
                }`}
        >
            {/* Sidebar Header */}
            <div className="hidden md:flex items-center justify-between p-4">
                {!isCollapsed && <h2 className="text-xl font-bold">Dashboard</h2>}
                <button
                    onClick={toggleSidebar}
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    className="focus:outline-none"
                >
                    {isCollapsed ? <MenuIcon /> : <CloseIcon />}
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="w-full md:w-auto md:mt-4">
                <ul className="flex justify-evenly items-center w-full bg-white md:block md:space-y-2">
                    {menuItems.map((item, index) => (
                        <li key={index} className='flex-grow pb-1'>
                            <Link
                                to={item.path}
                                className={`flex items-center flex-col  md:${isCollapsed ? 'flex-col' : 'flex-row'} px-4 py-2 text-gray-700 hover:bg-gray-200 rounded
                                ${index === currentIndex ? 'bg-gray-100 font-semibold' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            >
                                {item.icon}
                                <span className={`text-xs font-semibold md:${isCollapsed ? 'text-sm' : 'text-base'}`}>
                                    {item.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
