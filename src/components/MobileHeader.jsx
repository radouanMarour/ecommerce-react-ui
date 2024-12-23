import React, { useState } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import Search from './Search';
import { useSelector } from 'react-redux';

const categories = [
    {
        category: 'Clothing',
        subcategories: ['T-Shirts', 'Shirts', 'Polo Shirts', 'Sweaters'],
    },
    {
        category: 'Footwear',
        subcategories: ['Casual Shoes', 'Formal Shoes', 'Sneakers', 'Boots'],
    },
    {
        category: 'Accessories',
        subcategories: ['Watches', 'Belts', 'Wallets', 'Sunglasses'],
    }
];

const MobileHeader = () => {
    const { loggedIN } = useSelector(state => state.auth)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);

    const toggleCategory = (index) => {
        setActiveCategory((prev) => (prev === index ? null : index));
    };

    return (
        <div className="h-12 relative px-6 shadow-md flex justify-between items-center">
            {/* Hamburger Menu */}
            <div onClick={() => setDropdownOpen(!dropdownOpen)}>
                {
                    dropdownOpen ?
                        <CloseOutlinedIcon className="text-slate-800 font-bold cursor-pointer" /> :
                        <MenuOutlinedIcon className="text-slate-800 font-bold cursor-pointer" />
                }
            </div>

            {/* Accordion Menu */}
            <div
                className={`${dropdownOpen ? 'absolute' : 'hidden'
                    } top-full left-0 w-full bg-white shadow-md z-10`}
                onMouseLeave={() => setDropdownOpen(false)}
            >
                <ul className="divide-y divide-slate-200">
                    {categories.map((cat, index) => (
                        <li key={index} className="p-2">
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleCategory(index)}
                            >
                                <span className="font-medium">{cat.category}</span>
                                {activeCategory === index ? (
                                    <ExpandLessOutlinedIcon />
                                ) : (
                                    <ExpandMoreOutlinedIcon />
                                )}
                            </div>
                            {activeCategory === index && (
                                <ul className="mt-2 pl-4 space-y-1">
                                    {cat.subcategories.map((subcat, subIndex) => (
                                        <li key={subIndex}>
                                            <Link
                                                to="/"
                                                className="block hover:bg-blue-100 px-2 py-1 rounded"
                                            >
                                                {subcat}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Logo */}
            <div className="h-full">
                <Link to="/" className="h-full">
                    <img src={Logo} alt="Logo" className="h-full w-32 object-contain" />
                </Link>
            </div>

            {/* Search and Cart */}
            <div className="flex gap-x-6">
                <Search isDesktop={false} />
                <Link to="/cart" className="px-0 block relative transition-all">
                    <ShoppingCartOutlinedIcon />
                    <span className="absolute -top-1 -right-2 text-white font-bold bg-slate-800 w-5 h-5 flex justify-center items-center rounded-full p-1">
                        0
                    </span>
                </Link>
                <div onClick={() => setAccountOpen(true)}>
                    <AccountCircleOutlinedIcon className='cursor-pointer' />
                </div>
                <div
                    className={`${accountOpen ? 'absolute' : 'hidden'
                        } top-full right-0 w-1/3 bg-white shadow-md z-10`}
                    onMouseLeave={() => setAccountOpen(false)}
                >
                    <ul className="w-full relative">
                        {
                            loggedIN ?
                                <>
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
                                        <button className="w-full text-left block hover:bg-blue-100 px-2 py-1">
                                            Logout
                                        </button>
                                    </li>
                                </> :
                                <>
                                    <li>
                                        <Link to="/register" className="block hover:bg-blue-100 px-2 py-1">
                                            Register
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/login" className="block hover:bg-blue-100 px-2 py-1">
                                            Login
                                        </Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MobileHeader;
