import React from 'react';
import { Search, AccountCircle, ShoppingCart } from '@mui/icons-material';
import '../styles/DesktopHeader.css';

const DesktopHeader = () => {
    return (
        <header className="desktop-header">
            <div className="desktop-logo">Men's Fashion</div>
            <div className="desktop-search">
                <input type="text" placeholder="Search..." className="search-input" />
                <Search className="search-icon" />
            </div>
            <nav className="desktop-nav">
                <div className="dropdown">
                    <span className="nav-link">Clothing</span>
                    <div className="dropdown-content">
                        <a href="/clothing/shirts">Shirts</a>
                        <a href="/clothing/pants">Pants</a>
                        <a href="/clothing/jackets">Jackets</a>
                        <a href="/clothing/sweaters">Sweaters</a>
                        <a href="/clothing/underwear">Underwear</a>
                    </div>
                </div>
                <div className="dropdown">
                    <span className="nav-link">Shoes</span>
                    <div className="dropdown-content">
                        <a href="/shoes/sneakers">Sneakers</a>
                        <a href="/shoes/boots">Boots</a>
                        <a href="/shoes/dress-shoes">Dress Shoes</a>
                        <a href="/shoes/sandals">Sandals</a>
                        <a href="/shoes/loafers">Loafers</a>
                    </div>
                </div>
                <div className="dropdown">
                    <span className="nav-link">Accessories</span>
                    <div className="dropdown-content">
                        <a href="/accessories/belts">Belts</a>
                        <a href="/accessories/watches">Watches</a>
                        <a href="/accessories/wallets">Wallets</a>
                        <a href="/accessories/hats">Hats</a>
                    </div>
                </div>
            </nav>
            <div className="desktop-icons">
                <AccountCircle className="icon" titleAccess="Login/Profile" />
                <ShoppingCart className="icon" titleAccess="Cart" />
            </div>
        </header>
    );
};

export default DesktopHeader;
