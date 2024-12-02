import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FeaturedCategories.css';

const FeaturedCategories = () => {
    const categories = [
        { name: 'Clothing', image: 'https://via.placeholder.com/300x300?text=Clothing', link: '/clothing' },
        { name: 'Shoes', image: 'https://via.placeholder.com/300x300?text=Shoes', link: '/shoes' },
        { name: 'Accessories', image: 'https://via.placeholder.com/300x300?text=Accessories', link: '/accessories' },
    ];

    return (
        <section className="featured-categories">
            <h2>Featured Categories</h2>
            <div className="categories-grid">
                {categories.map((category, index) => (
                    <Link to={category.link} key={index} className="category-card">
                        <img src={category.image} alt={category.name} />
                        <h3>{category.name}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default FeaturedCategories;
