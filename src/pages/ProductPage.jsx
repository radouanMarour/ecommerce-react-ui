import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/productApi';
import Loader from '../components/Loader';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { AddShoppingCart } from '@mui/icons-material';
import { notifyError } from '../utils/notifications';

const ProductPage = () => {
    const { id } = useParams();
    const { product, loading, error } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [price, setPrice] = useState(product.price);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <div className="text-center mt-8 text-red-500">Error loading product.</div>;
    }
    if (!product) {
        return <div className="text-center mt-8">Product not found</div>;
    }

    const renderStars = () => {
        const fullStars = Math.floor(product.ratings.average);
        const hasHalfStar = product.ratings.average % 1 !== 0;
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

    const handleColorSelect = (color) => {
        setPrice(product.variants.find((variant) => variant.color === color).price);
        setSelectedColor(color);
    }
    const handleSizeSelect = (size) => {
        setPrice(product.variants.find((variant) => variant.size === size).price);
        setSelectedSize(size);
    }

    const handleAddToCart = () => {
        const variant = product.variants.find((variant) => variant.color === selectedColor && variant.size === selectedSize);
        if (!variant) {
            notifyError('Please select a valid variant');
        }
        const item = {
            product: product._id,
            color: selectedColor,
            size: selectedSize,
            price: product.price,
            image: product.images[0],
            name: product.name,
            qty: 1,
        }
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-center gap-6">
                {/* Product Image */}
                <div className="md:w-1/2">
                    <div className="relative">
                        <img
                            src={product?.images?.[0] || "/placeholder.png"}
                            alt={product.name}
                            className="w-full h-96 object-contain rounded-md mb-2"
                        />
                    </div>

                    {/* Image thumbnails */}
                    <div className="flex flex-row gap-2 overflow-x-auto ">
                        {product?.images?.map((image, index) => (
                            <img
                                key={index}
                                src={image || "/placeholder.png"}
                                alt={product.name}
                                className="w-20 h-20 object-contain rounded-md border border-gray-200 cursor-pointer hover:border-gray-400 transition-all"
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="md:w-1/2">
                    <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>
                    <div className="flex items-center my-4 text-gray-700">
                        <span className="flex mr-2">{renderStars()}</span>
                        <span className="text-sm">{product.ratings.count} reviews</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">${price || product.price}</h2>
                    <div className="my-2">
                        <h4 className="font-medium text-gray-700">Available Options</h4>
                        <div className="my-2">
                            <span className="font-semibold text-gray-800">Colors:</span>
                            <div className="flex gap-1">
                                {product.variants?.map((variant, index) => {
                                    return (
                                        <span
                                            key={index}
                                            className={`block w-6 h-6 rounded-sm bg-${variant.color.toLowerCase()}-500 ${selectedColor === variant.color && "border-2 border-black"} cursor-pointer`}
                                            style={{ backgroundColor: variant.color.toLowerCase() }}
                                            onClick={() => handleColorSelect(variant.color)}
                                        ></span>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="my-2">
                            <span className="font-semibold text-gray-800">Sizes:</span>
                            <div className="flex gap-1">
                                {product.variants?.map((variant, index) => {
                                    return (
                                        <span
                                            key={index}
                                            className={`flex items-center justify-center w-6 h-6 border border-black rounded-sm text-gray-500 ${selectedSize === variant.size && "border-2"} cursor-pointer`}
                                            onClick={() => handleSizeSelect(variant.size)}
                                        >
                                            {variant.size}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <button
                        className="my-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                        onClick={handleAddToCart}
                    >
                        <AddShoppingCart /> Add to Cart
                    </button>
                </div>
            </div>
            <div className="text-gray-700 font-medium mt-4">
                <p className="mb-2">Description</p>
                <p className="text-gray-700 text-md">{product.description}</p>
            </div>
        </div>
    );
};

export default ProductPage;