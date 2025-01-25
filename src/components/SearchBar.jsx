import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/products?search=${encodeURIComponent(query.trim())}`);
            setQuery('');
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center">
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
