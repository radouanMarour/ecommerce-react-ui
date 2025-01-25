import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { logoutUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../api/cartApi';

const PostLogin = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { items } = useSelector(state => state.cart);
    const { token, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart(token));
    }, [dispatch, token]);

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <div className="flex items-center gap-x-4 relative">
            <Link to="/cart" className='relative flex items-center border border-gray-800 py-2 px-5 rounded-md hover:bg-gray-100 transition-all duration-300'>
                <ShoppingCartOutlinedIcon className="text-gray-700" />
                <span className='absolute -top-2 -right-2 text-white text-sm font-semibold bg-gray-800 w-6 h-6 flex justify-center items-center rounded-full'>
                    {items?.length || 0}
                </span>
            </Link>
            <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer flex items-center border border-gray-800 py-2 px-5 rounded-md hover:bg-gray-100 transition-all duration-300"
            >
                <AccountCircleOutlinedIcon className="text-gray-700" />
            </div>
            <div
                className={`${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    } absolute top-full right-0 w-64 shadow-lg bg-white z-20 rounded-md border border-gray-200 transition-all duration-300 transform`}
                onMouseLeave={() => setDropdownOpen(false)}
            >
                <ul className="py-2">
                    {user?.role === 'admin' && (
                        <li>
                            <Link to="/admin/dashboard" className="flex px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                                Dashboard
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/profile" className="flex px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                            My Account
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders/myorders" className="flex px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                            Orders
                        </Link>
                    </li>
                    <li>
                        <button
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PostLogin;