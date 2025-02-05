import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/productApi';
import Loader from '../components/Loader';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { AddShoppingCart } from '@mui/icons-material';
import { notifyError } from '../utils/notifications';
import { addToCart } from '../api/cartApi';
import AddRviewForm from '../components/AddRviewForm';

const ProductPage = () => {
    const { id } = useParams();
    const { product, loading, error } = useSelector((state) => state.product);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [itemsInstock, setItemsInStock] = useState(0);
    const [optionExists, setOptionExists] = useState(true);
    const [price, setPrice] = useState(product?.price || 0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product && product.variants && product.variants.length > 0) {
            setSelectedColor(product.variants[0].color);
            setSelectedSize(product.variants[0].size);
            setPrice(product.variants[0].price);
            setItemsInStock(product.variants[0].stock);
        }
    }, [product]);

    useEffect(() => {
        if (product && selectedColor && selectedSize) {
            const variant = product.variants.find(
                variant => variant.color === selectedColor && variant.size === selectedSize
            );
            if (variant) {
                setPrice(variant.price);
                setItemsInStock(variant.stock);
                setOptionExists(true);
            } else {
                setOptionExists(false);
            }
        }
    }, [selectedColor, selectedSize, product]);

    if (loading) {
        return <Loader />;
    }
    if (!product) {
        return <div className="text-center mt-8">Product not found</div>;
    }

    const renderStars = () => {
        if (!product?.ratings) return null;
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
        const item = {
            product: product._id,
            color: selectedColor,
            size: selectedSize,
            price: price || product.price,
            quantity: quantity,
        }
        dispatch(addToCart({ token, item }));
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-8 mb-12">
                {/* Product Image */}
                <div className="lg:w-1/2 space-y-4">
                    <div className="relative bg-gray-50 rounded-lg overflow-hidden">
                        <img
                            src={product?.images?.[selectedImageIndex] || "/placeholder.png"}
                            alt={product.name}
                            className="w-full h-[500px] object-contain p-4 transition-transform hover:scale-105"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {product?.images?.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedImageIndex(index)}
                                className={`bg-gray-50 rounded-lg p-2 transition-all cursor-pointer
                                    ${selectedImageIndex === index
                                        ? 'ring-2 ring-blue-600 shadow-md'
                                        : 'hover:shadow-md'
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`${product.name} view ${index + 1}`}
                                    className="w-full h-24 object-contain rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="lg:w-1/2 space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                {renderStars()}
                                <span className="ml-2 text-sm text-gray-600">({product.ratings.count})</span>
                            </div>
                            <span className="text-3xl font-bold text-blue-600">${price || product.price}</span>
                        </div>
                    </div>

                    <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Colors</h4>
                            <div className="flex gap-3">
                                {product.variants?.map((variant, index) => (
                                    <button
                                        key={index}
                                        className={`w-10 h-10 rounded-full border-2 p-1 transition-all
                                            ${selectedColor === variant.color ? 'border-blue-600 shadow-lg' : 'border-transparent'}`}
                                        onClick={() => handleColorSelect(variant.color)}
                                    >
                                        <span
                                            className="block w-full h-full rounded-full"
                                            style={{ backgroundColor: variant.color.toLowerCase() }}
                                        ></span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Size</h4>
                            <div className="flex gap-3">
                                {product.variants?.map((variant, index) => (
                                    <button
                                        key={index}
                                        className={`w-12 h-12 flex items-center justify-center rounded-lg border 
                                            ${selectedSize === variant.size
                                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                                : 'border-gray-300 hover:border-blue-600'}`}
                                        onClick={() => handleSizeSelect(variant.size)}
                                    >
                                        {variant.size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {!optionExists &&
                            <p className="text-red-500 text-sm bg-red-50 p-3 rounded">
                                This combination is not available. Please select another option.
                            </p>
                        }

                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                Quantity
                                {optionExists &&
                                    <span className="text-sm font-normal text-green-600 ml-2">
                                        {itemsInstock} in stock
                                    </span>
                                }
                            </h4>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        className="px-4 py-2 text-blue-600 hover:bg-blue-50 disabled:text-gray-400"
                                        onClick={() => setQuantity(quantity - 1)}
                                        disabled={quantity === 1}
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                                    <button
                                        className="px-4 py-2 text-blue-600 hover:bg-blue-50 disabled:text-gray-400"
                                        onClick={() => setQuantity(quantity + 1)}
                                        disabled={quantity === itemsInstock}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 
                            text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                        onClick={handleAddToCart}
                    >
                        <AddShoppingCart /> Add to Cart
                    </button>
                </div>
            </div>

            {/* Description and Reviews */}
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <AddRviewForm productId={product._id} />
                </div>
            </div>

            {/* Customer Reviews */}
            <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                <div className="grid gap-6">
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex text-yellow-400">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <StarRateIcon key={i} className="w-5 h-5" />
                                            ))}
                                        </div>
                                        <span className="font-semibold text-gray-900">
                                            {review.user.username}
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-8">No reviews yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;