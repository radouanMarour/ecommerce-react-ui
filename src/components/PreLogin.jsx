import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const PreLogin = () => {
    return (
        <div className="flex items-center gap-x-4">
            <Link
                to="/cart"
                className="border border-gray-800 py-2 px-5 rounded-md hover:bg-gray-100 transition-all duration-300 text-gray-700 relative"
            >
                <ShoppingCartOutlinedIcon />
                <span className='absolute top-1 right-1 text-white font-bold bg-slate-800 w-5 h-5 flex justify-center items-center rounded-full p-1'>
                    {0}
                </span>
            </Link>
            <Link
                to="/login"
                className="border border-gray-800 py-2 px-5 rounded-md hover:bg-gray-100 transition-all duration-300 text-gray-700"
            >
                Login
            </Link>
            <Link
                to="/register"
                className="border border-gray-800 py-2 px-5 rounded-md hover:bg-gray-100 transition-all duration-300 text-gray-700"
            >
                Register
            </Link>
        </div>
    )
}

export default PreLogin