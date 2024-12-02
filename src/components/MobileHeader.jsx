import React, { useState } from 'react';
import { Search, AccountCircle, ShoppingCart } from '@mui/icons-material';
import '../styles/MobileHeader.css';
import { motion } from "motion/react"

const MobileHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };


    return (
        <header className="mobile-header">
            <div className="mobile-logo">Men's Fashion</div>
            <div className="mobile-icons">
                <Search className="icon" />
                <AccountCircle className="icon" titleAccess="Login/Profile" />
                <ShoppingCart className="icon" titleAccess="Cart" />
                <button onClick={toggleMenu} className="hamburger">☰</button>
            </div>
            {menuOpen && (
                <motion.nav className="mobile-menu"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <div className="menu-section">
                        <h4 onClick={() => toggleSection('clothing')} className={expandedSections.clothing ? 'expanded' : ''}>Clothing</h4>
                        {expandedSections.clothing && (
                            <div className="submenu">
                                <a href="/clothing/shirts">Shirts</a>
                                <a href="/clothing/pants">Pants</a>
                                <a href="/clothing/jackets">Jackets</a>
                                <a href="/clothing/sweaters">Sweaters</a>
                                <a href="/clothing/underwear">Underwear</a>
                            </div>
                        )}
                    </div>
                    <div className="menu-section">
                        <h4 onClick={() => toggleSection('shoes')} className={expandedSections.shoes ? 'expanded' : ''}>Shoes</h4>                        {expandedSections.shoes && (
                            <div className="submenu">
                                <a href="/shoes/sneakers">Sneakers</a>
                                <a href="/shoes/boots">Boots</a>
                                <a href="/shoes/dress-shoes">Dress Shoes</a>
                                <a href="/shoes/sandals">Sandals</a>
                                <a href="/shoes/loafers">Loafers</a>
                            </div>
                        )}
                    </div>
                    <div className="menu-section">
                        <h4 onClick={() => toggleSection('accessories')} className={expandedSections.accessories ? 'expanded' : ''}>ccessories</h4>
                        {expandedSections.accessories && (
                            <div className="submenu">
                                <a href="/accessories/belts">Belts</a>
                                <a href="/accessories/watches">Watches</a>
                                <a href="/accessories/wallets">Wallets</a>
                                <a href="/accessories/hats">Hats</a>
                            </div>
                        )}
                    </div>
                </motion.nav>
            )}
        </header>
    );
};

export default MobileHeader;
