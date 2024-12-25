import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { logoutUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const PostLogin = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <div className="flex gap-x-4 relative">
            <Link to="/cart" className='border border-black py-1 px-4 block relative hover:bg-slate-300 transition-all'>
                <ShoppingCartOutlinedIcon />
                <span className='absolute top-1 right-1 text-white font-bold bg-slate-800 w-5 h-5 flex justify-center items-center rounded-full p-1'>0</span>
            </Link>
            <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer border border-black py-1 px-4 block relative hover:bg-slate-300 transition-all"
            >
                <AccountCircleOutlinedIcon />
            </div>
            <div
                className={`${dropdownOpen ? 'absolute' : 'hidden'
                    } top-full right-8 w-60 shadow-md bg-white z-10`}
                onMouseLeave={() => setDropdownOpen(false)}
            >
                <ul className="w-full relative">
                    <li>
                        <Link to="/profile" className="block hover:bg-blue-100 px-2 py-1">
                            My Account
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders" className="block hover:bg-blue-100 px-2 py-1">
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/wishlist" className="block hover:bg-blue-100 px-2 py-1">
                            Wishlist
                        </Link>
                    </li>
                    <li>
                        <button
                            className="w-full text-left block hover:bg-blue-100 px-2 py-1"
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