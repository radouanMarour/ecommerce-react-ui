import React from 'react'
import { Link } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-gray-400">
                            Your trusted source for quality products and excellent service.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/products" className="hover:text-white">Products</Link></li>
                            <li><Link to="/categories" className="hover:text-white">Categories</Link></li>
                            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center gap-2">
                                <LocationOnIcon fontSize="small" />
                                123 Street Name
                            </li>
                            <li className="flex items-center gap-2">
                                <PhoneIcon fontSize="small" />
                                +1 234 567 890
                            </li>
                            <li className="flex items-center gap-2">
                                <EmailIcon fontSize="small" />
                                info@example.com
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Social Links & Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex space-x-4 mb-4 md:mb-0">
                            <a href="#" className="hover:text-white">
                                <FacebookIcon className="text-2xl" />
                            </a>
                            <a href="#" className="hover:text-white">
                                <TwitterIcon className="text-2xl" />
                            </a>
                            <a href="#" className="hover:text-white">
                                <InstagramIcon className="text-2xl" />
                            </a>
                            <a href="#" className="hover:text-white">
                                <LinkedInIcon className="text-2xl" />
                            </a>
                        </div>
                        <div className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Modishmen. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
