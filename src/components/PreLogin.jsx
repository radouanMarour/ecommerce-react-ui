import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const PreLogin = () => {
    return (
        <div className="flex gap-x-6">
            <Link to="/cart" className='border border-black py-1 px-4 block relative hover:bg-slate-300 transition-all'>
                <ShoppingCartOutlinedIcon />
                <span className='absolute top-1 right-1 text-white font-bold bg-slate-800 w-5 h-5 flex justify-center items-center rounded-full p-1'>0</span>
            </Link>
            <Link to="/login" className='border border-black py-1 px-4 hover:bg-slate-300 transition-all' >
                Login
            </Link>
            <Link to="/register" className='border border-black py-1 px-4  hover:bg-slate-300 transition-all'>
                Register
            </Link>
        </div>
    )
}

export default PreLogin