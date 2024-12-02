import React from 'react';
import '../styles/ProductCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, index }) => {
    return (
        <div key={index} className="product-card">
            <Link to={product.link}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
            </Link>
            <p className="price">{product.price}</p>
            <button className="add-to-cart">Add to Cart</button>
        </div>
    );
};

export default ProductCard;