import React from 'react';
import { Search, AccountCircle, ShoppingCart } from '@mui/icons-material';
import '../styles/DesktopHeader.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const DesktopHeader = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    return (
        <header className="desktop-header">
            <div className="desktop-logo">
                <Link to="/">Men's Fashion</Link>
            </div>
            <div className="desktop-search">
                <input type="text" placeholder="Search..." className="search-input" />
                <Search className="search-icon" />
            </div>
            <nav className="desktop-nav">
                <div className="dropdown">
                    <span className="nav-link">Clothing</span>
                    <div className="dropdown-content">
                        <Link to="/clothing/shirts">Shirts</Link>
                        <Link to="/clothing/pants">Pants</Link>
                        <Link to="/clothing/jackets">Jackets</Link>
                        <Link to="/clothing/sweaters">Sweaters</Link>
                        <Link to="/clothing/underwear">Underwear</Link>
                    </div>
                </div>
                <div className="dropdown">
                    <span className="nav-link">Shoes</span>
                    <div className="dropdown-content">
                        <Link to="/shoes/sneakers">Sneakers</Link>
                        <Link to="/shoes/boots">Boots</Link>
                        <Link to="/shoes/dress-shoes">Dress Shoes</Link>
                        <Link to="/shoes/sandals">Sandals</Link>
                        <Link to="/shoes/loafers">Loafers</Link>
                    </div>
                </div>
                <div className="dropdown">
                    <span className="nav-link">Accessories</span>
                    <div className="dropdown-content">
                        <Link to="/accessories/belts">Belts</Link>
                        <Link to="/accessories/watches">Watches</Link>
                        <Link to="/accessories/wallets">Wallets</Link>
                        <Link to="/accessories/hats">Hats</Link>
                    </div>
                </div>
                <div className="dropdown">
                    <span className="nav-link">
                        <AccountCircle className="icon" titleAccess="Account" />
                    </span>
                    <div className="dropdown-content">
                        {
                            isAuthenticated ?
                                <>
                                    <Link to="/account">Account</Link>
                                    {user.role === "admin" && <Link to="/admin/dashboard">Dashboard</Link>}
                                    <button onClick={() => dispatch(logout())}>Logout</button>
                                </> :
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/signup">Sign up</Link>
                                </>
                        }
                    </div>
                </div>
            </nav>
            <div className="desktop-icons">
                <Link to="/cart">
                    <ShoppingCart className="icon" titleAccess="Cart" />
                </Link>
            </div>
        </header>
    );
};

export default DesktopHeader;
