import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles/SearchResults.css';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);

    useEffect(() => {
        // Simulated search functionality (replace with API call)
        const allProducts = [
            { id: 1, name: 'Casual Shirt', price: 49.99, image: 'https://via.placeholder.com/300x400?text=Casual+Shirt' },
            { id: 2, name: 'Leather Boots', price: 99.99, image: 'https://via.placeholder.com/300x400?text=Leather+Boots' },
            { id: 3, name: 'Classic Watch', price: 149.99, image: 'https://via.placeholder.com/300x400?text=Classic+Watch' },
            { id: 4, name: 'Denim Jacket', price: 89.99, image: 'https://via.placeholder.com/300x400?text=Denim+Jacket' },
        ];

        // Filter products by query
        const filteredResults = allProducts.filter((product) =>
            product.name.toLowerCase().includes(query?.toLowerCase() || '')
        );

        setResults(filteredResults);
    }, [query]);

    return (
        <div className="search-results-page">
            <h1>Search Results for "{query}"</h1>
            {results.length > 0 ? (
                <div className="results-grid">
                    {results.map((product) => (
                        <div key={product.id} className="result-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p className="price">${product.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products found for your search.</p>
            )}
        </div>
    );
};

export default SearchResults;
