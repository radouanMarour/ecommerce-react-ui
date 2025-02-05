import React, { useEffect, useState } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../api/categoryApi';

const MobileHeader = () => {
    const { isAuthenticated } = useSelector(state => state.auth)
    const { items } = useSelector(state => state.cart);
    const { categories } = useSelector(state => state.category)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    const toggleCategory = (index) => {
        setActiveCategory((prev) => (prev === index ? null : index));
    };

    return (
        <div className="h-14 relative px-4 md:px-6 shadow-md flex justify-between items-center bg-white">
            {/* Hamburger Menu */}
            <div className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}>
                {
                    dropdownOpen ?
                        <CloseOutlinedIcon className="text-slate-800 cursor-pointer" /> :
                        <MenuOutlinedIcon className="text-slate-800 cursor-pointer" />
                }
            </div>

            {/* Accordion Menu */}
            <div
                className={`${dropdownOpen
                    ? 'absolute opacity-100 translate-y-0'
                    : 'absolute opacity-0 -translate-y-2 pointer-events-none'
                    } top-full left-0 w-full bg-white shadow-lg z-50 transition-all duration-200 ease-in-out`}
                onMouseLeave={() => setDropdownOpen(false)}
            >
                <ul className="divide-y divide-slate-100">
                    {categories.map((cat, index) => {
                        if (!cat.parent)
                            return (
                                <li key={index} className="hover:bg-gray-50">
                                    <div
                                        className="flex justify-between items-center cursor-pointer p-3 transition-colors"
                                        onClick={() => toggleCategory(index)}
                                    >
                                        <Link
                                            to={`/products?category=${cat.name.toLowerCase()}`}
                                            className="font-medium text-slate-800"
                                        >
                                            {cat.name}
                                        </Link>
                                        {activeCategory === index ? (
                                            <ExpandLessOutlinedIcon className="text-slate-600" />
                                        ) : (
                                            <ExpandMoreOutlinedIcon className="text-slate-600" />
                                        )}
                                    </div>
                                    {activeCategory === index && (
                                        <ul className="bg-gray-50 py-2">
                                            {cat.subcategories.map((subcat, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        to={`/products?category=${cat.name.toLowerCase()}&subcategory=${subcat.name.toLowerCase()}`}
                                                        className="block px-6 py-2 hover:bg-gray-100 transition-colors text-slate-700"
                                                    >
                                                        {subcat.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            )
                    })}
                </ul>
            </div>

            {/* Logo */}
            <div className="h-full py-2">
                <Link to="/" className="h-full block">
                    <img src={Logo} alt="Logo" className="h-full w-32 object-contain" />
                </Link>
            </div>

            {/* Search and Cart */}
            <div className="flex items-center gap-x-4">
                <Search isDesktop={false} />
                <Link to="/cart" className="p-2 block relative hover:bg-gray-100 rounded-full transition-colors">
                    <ShoppingCartOutlinedIcon className="text-slate-800" />
                    <span className="absolute -top-1 -right-1 text-white text-xs font-bold bg-slate-800 w-5 h-5 flex justify-center items-center rounded-full">
                        {items.length}
                    </span>
                </Link>
                <div
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    onClick={() => setAccountOpen(true)}
                >
                    <AccountCircleOutlinedIcon className="text-slate-800" />
                </div>

                {/* Account Dropdown */}
                <div
                    className={`${accountOpen
                        ? 'absolute opacity-100 translate-y-0'
                        : 'absolute opacity-0 -translate-y-2 pointer-events-none'
                        } top-full right-0 w-48 bg-white shadow-lg z-50 rounded-md overflow-hidden transition-all duration-200 ease-in-out mt-1`}
                    onMouseLeave={() => setAccountOpen(false)}
                >
                    <ul className="py-1">
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/profile" className="block px-4 py-2 text-slate-700 hover:bg-gray-100 transition-colors">
                                        My Account
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/orders/myorders" className="block px-4 py-2 text-slate-700 hover:bg-gray-100 transition-colors">
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <button className="w-full text-left px-4 py-2 text-slate-700 hover:bg-gray-100 transition-colors">
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/register" className="block px-4 py-2 text-slate-700 hover:bg-gray-100 transition-colors">
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className="block px-4 py-2 text-slate-700 hover:bg-gray-100 transition-colors">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MobileHeader;
