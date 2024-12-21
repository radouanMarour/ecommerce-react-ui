import React, { useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const DescktopHeader = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [subDropdownOpen, setSubDropdownOpen] = useState(null);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    const toggleSubDropdown = (index) => {
        setSubDropdownOpen(subDropdownOpen === index ? null : index);
    };

    return (
        <header className="flex items-center justify-between py-4 px-8 bg-gray-100 shadow">
            <div className="text-xl font-bold">LOGO</div>
            <div className="relative">
                <button
                    className="mx-4 px-4 py-2 border border-black text-black rounded hover:bg-black hover:text-white focus:outline-none"
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
            <div className="flex-1 mx-4">
                <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex space-x-4">
                <div>
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none border border-black"
                        onClick={toggleProfileDropdown}
                    >
                        <AccountCircleOutlinedIcon />
                    </button>
                    {profileDropdownOpen && <div className="absolute right-8 mt-2 bg-white border rounded shadow-lg w-60">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Login</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Register</a>
                    </div>}
                </div>

                <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none border border-black">
                    <ShoppingCartOutlinedIcon />
                </button>
            </div>
        </header>
    );
};

export default DescktopHeader;
