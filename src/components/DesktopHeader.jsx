import React from 'react'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import Categories from './Categories'
import Search from './Search'
import UserMenu from './UserMenu'

const DescktopHeader = () => {
    return (
        <div className='h-16 fixed top-0 w-full z-50 bg-white px-8 shadow-md flex justify-between items-center'>
            <div className="">
                <Link to="/" className=''>
                    <img src={Logo} alt="Logo" className='w-32 object-contain' />
                </Link>
            </div>
            <Categories />
            <Search isDesktop={true} />
            <UserMenu />
        </div>
    )
}

export default DescktopHeader