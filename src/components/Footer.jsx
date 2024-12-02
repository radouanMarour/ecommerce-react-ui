import React from 'react';
import '../styles/Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';


const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-top">
                    {/* ... (Your footer columns remain the same) ... */}
                </div>
                <div className="footer-bottom">
                    <div className="copyright">
                        © {new Date().getFullYear()} FashionHub. All rights reserved.
                    </div>
                    <div className="social-media">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <FacebookIcon />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <TwitterIcon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;