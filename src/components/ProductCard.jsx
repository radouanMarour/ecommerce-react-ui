import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const ProductCard = ({ product }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);
    const { _id, name, ratings: { average, count }, price, images } = product;

    const renderStars = () => {
        const fullStars = Math.floor(average);
        const hasHalfStar = average % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<StarRateIcon key={`full-${i}`} className="text-yellow-500" />);
        }

        if (hasHalfStar) {
            stars.push(<StarHalfIcon key="half" className="text-yellow-500" />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<StarBorderIcon key={`empty-${i}`} className="text-yellow-500" />);
        }

        return stars;
    };

    const handleAddToCart = async (e) => {
        e.preventDefault(); // Prevent navigation
        setAddingToCart(true);
        try {
            // Add your cart logic here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        } finally {
            setAddingToCart(false);
        }
    };

    return (
        <Link to={`/products/${_id}`} className="block shadow-md bg-white hover:shadow-lg transition-shadow duration-300 pb-2">
            <div className="mb-2 relative">
                {!imageLoaded && (
                    <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                )}
                <img
                    src={images[0]}
                    alt={name}
                    className={`w-full object-contain mb-2 ${!imageLoaded ? 'hidden' : ''}`}
                    onLoad={() => setImageLoaded(true)}
                />
            </div>
            <div className="flex items-center justify-between mb-2 px-2">
                <h3 className="font-normal text-gray-800">{name}</h3>
                {!true ? <Favorite className="text-red-400" /> : <FavoriteBorder className="text-red-400" />}
            </div>

            <div className="flex items-center mb-1 pl-2">
                <span className="flex">{renderStars()}</span>
                <span className="text-sm text-gray-500 ml-1">{count}</span>
            </div>

            <div className="text-gray-700 font-medium text-lg mt-2 pl-2 pb-2">
                <span className="text-xl text-black font-bold">${price}</span>
            </div>
            <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className={`w-11/12 mx-auto block border border-gray-500 text-gray-600 hover:bg-gray-600 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors ${addingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
            >

                {addingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
        </Link >
    );
};

export default ProductCard;