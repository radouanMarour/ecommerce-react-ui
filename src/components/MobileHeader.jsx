import React, { useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const MobileHeader = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [subDropdownOpen, setSubDropdownOpen] = useState(null);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    const toggleSubDropdown = (index) => {
        setSubDropdownOpen(subDropdownOpen === index ? null : index);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="bg-gray-100 shadow">
            <div className="flex items-center justify-between py-4 px-4 md:px-8">
                <div className="text-xl font-bold">LOGO</div>
                <div className="md:hidden">
                    <button
                        className="p-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
                        onClick={toggleMobileMenu}
                    >
                        ☰
                    </button>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <div className="relative">
                        <button
                            className="px-4 py-2 border border-black text-black rounded hover:bg-black hover:text-white focus:outline-none"
                            onClick={toggleDropdown}
                        >
                            Categories
                        </button>
                        {dropdownOpen && (
                            <div className="absolute mt-2 bg-white border rounded shadow-lg w-60">
                                <div className="group">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => toggleSubDropdown(1)}
                                    >
                                        Category 1
                                    </a>
                                    {subDropdownOpen === 1 && (
                                        <div className="ml-4 mt-2 bg-gray-50 border rounded shadow-lg">
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Subcategory 1.1</a>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Subcategory 1.2</a>
                                        </div>
                                    )}
                                </div>
                                <div className="group">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => toggleSubDropdown(2)}
                                    >
                                        Category 2
                                    </a>
                                    {subDropdownOpen === 2 && (
                                        <div className="ml-4 mt-2 bg-gray-50 border rounded shadow-lg">
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Subcategory 2.1</a>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Subcategory 2.2</a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="relative">
                        <button
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none border border-black"
                            onClick={toggleProfileDropdown}
                        >
                            <AccountCircleOutlinedIcon />
                        </button>
                        {profileDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-60">
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Login</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Register</a>
                            </div>
                        )}
                    </div>
                    <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none border border-black">
                        <ShoppingCartOutlinedIcon />
                    </button>
                </div>
            </div>
            {mobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg border-t">
                    <div className="px-4 py-2 border-b">
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={toggleDropdown}
                        >
                            Categories
                        </button>
                        {dropdownOpen && (
                            <div className="pl-4">
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => toggleSubDropdown(1)}
                                >
                                    Category 1
                                </button>
                                {subDropdownOpen === 1 && (
                                    <div className="pl-4">
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Subcategory 1.1</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Subcategory 1.2</a>
                                    </div>
                                )}
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => toggleSubDropdown(2)}
                                >
                                    Category 2
                                </button>
                                {subDropdownOpen === 2 && (
                                    <div className="pl-4">
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Subcategory 2.1</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Subcategory 2.2</a>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="px-4 py-2 border-b">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Login</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Register</a>
                    </div>
                    <div className="px-4 py-2">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Cart</a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default MobileHeader;
