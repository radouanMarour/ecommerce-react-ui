import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FeaturedProducts.css';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
    const products = [
        { name: 'Casual Shirt', price: '$49.99', image: 'https://via.placeholder.com/300x400?text=Casual+Shirt', link: '/product/1' },
        { name: 'Leather Boots', price: '$99.99', image: 'https://via.placeholder.com/300x400?text=Leather+Boots', link: '/product/2' },
        { name: 'Classic Watch', price: '$149.99', image: 'https://via.placeholder.com/300x400?text=Classic+Watch', link: '/product/3' },
        { name: 'Denim Jacket', price: '$89.99', image: 'https://via.placeholder.com/300x400?text=Denim+Jacket', link: '/product/4' },
    ];

    return (
        <section className="featured-products">
            <h2>Bestsellers</h2>
            <div className="products-grid">
                {products.map((product, index) => (<ProductCard product={product} index={index} />))}
            </div>
        </section>
    );
};

export default FeaturedProducts;
