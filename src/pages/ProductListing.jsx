import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductListing.css';
import ProductCard from '../components/ProductCard';

const ProductListing = () => {
    const [sortOption, setSortOption] = useState('popularity');

    const products = [
        { id: 1, name: 'Casual Shirt', price: 49.99, image: 'https://via.placeholder.com/300x400?text=Casual+Shirt' },
        { id: 2, name: 'Leather Boots', price: 99.99, image: 'https://via.placeholder.com/300x400?text=Leather+Boots' },
        { id: 3, name: 'Classic Watch', price: 149.99, image: 'https://via.placeholder.com/300x400?text=Classic+Watch' },
        { id: 4, name: 'Denim Jacket', price: 89.99, image: 'https://via.placeholder.com/300x400?text=Denim+Jacket' },
    ];

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        // Add logic for sorting products based on the selected option
    };

    return (
        <div className="product-listing-page">
            <h1>Clothing</h1>
            <div className="filters">
                <select onChange={handleSortChange} value={sortOption} className="sort-dropdown">
                    <option value="popularity">Sort by: Popularity</option>
                    <option value="low-to-high">Sort by: Price (Low to High)</option>
                    <option value="high-to-low">Sort by: Price (High to Low)</option>
                </select>
                {/* Add additional filters here, such as size or color */}
            </div>
            <div className="product-grid">
                {products.map((product, index) => (
                    <ProductCard product={product} index={index} />
                ))}
            </div>
            <div className="pagination">
                <button disabled>{'<'}</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>{'>'}</button>
            </div>
        </div>
    );
};

export default ProductListing;
