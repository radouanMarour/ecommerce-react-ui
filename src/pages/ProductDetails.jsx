import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams(); // Dynamic product ID from URL
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    // Simulated product data
    const product = {
        id,
        name: 'Casual Shirt',
        price: 49.99,
        description: 'A comfortable and stylish casual shirt made from 100% cotton.',
        images: [
            'https://via.placeholder.com/400x400?text=Casual+Shirt+Front',
            'https://via.placeholder.com/400x400?text=Casual+Shirt+Back',
            'https://via.placeholder.com/400x400?text=Casual+Shirt+Side',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Red', 'Blue', 'Green'],
    };

    const relatedProducts = [
        { id: 2, name: 'Formal Shirt', price: 69.99, image: 'https://via.placeholder.com/300x400?text=Formal+Shirt' },
        { id: 3, name: 'Leather Jacket', price: 149.99, image: 'https://via.placeholder.com/300x400?text=Leather+Jacket' },
    ];

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert('Please select a size and color before adding to cart.');
            return;
        }
        alert(`Added ${product.name} (${selectedSize}, ${selectedColor}) to cart.`);
    };

    return (
        <div className="product-details-page">
            <div className="product-details">
                {/* Product Images */}
                <div className="product-images">
                    <img src={product.images[0]} alt={product.name} className="main-image" />
                    <div className="image-thumbnails">
                        {product.images.map((img, index) => (
                            <img key={index} src={img} alt={`Thumbnail ${index + 1}`} />
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="price">${product.price.toFixed(2)}</p>
                    <p>{product.description}</p>

                    {/* Size Selection */}
                    <div className="selection">
                        <label>Size:</label>
                        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                            <option value="">Select Size</option>
                            {product.sizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Color Selection */}
                    <div className="selection">
                        <label>Color:</label>
                        <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                            <option value="">Select Color</option>
                            {product.colors.map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="add-to-cart" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Related Products Carousel */}
            <div className="related-products">
                <h2>Related Products</h2>
                <div className="related-grid">
                    {relatedProducts.map((related) => (
                        <div key={related.id} className="related-product-card">
                            <img src={related.image} alt={related.name} />
                            <h3>{related.name}</h3>
                            <p>${related.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
