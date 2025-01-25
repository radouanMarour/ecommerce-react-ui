import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/productApi';
import { fetchCategories } from '../api/categoryApi';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useSearchParams } from 'react-router-dom';

const ProductList = () => {
    const { products, loading, error } = useSelector((state) => state.product);
    const { categories } = useSelector((state) => state.category);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({
        category: '',
        subcategory: '',
        size: '',
        color: '',
        priceMin: 0,
        priceMax: 1000,
    });
    const [sortOption, setSortOption] = useState('');
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams({
            ...filters,
            ...(sortOption && { sort: sortOption }),
        });
        dispatch(fetchProducts(params));
    }, [filters, sortOption]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        setSubcategories(categories.find((cat) => cat._id === selectedCategory)?.subcategories || []);
    }, [selectedCategory]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            setSelectedCategory(value);
        }
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const resetFilters = () => {
        setFilters({
            category: '',
            subcategory: '',
            size: '',
            color: '',
            priceMin: 0,
            priceMax: 1000,
        });
        setSortOption('');
        setSelectedCategory('');
    };

    const activeFiltersCount = Object.values(filters).filter(value => value !== '' && value !== 0).length;

    const categoryId = searchParams.get('category');
    const categoryName = searchParams.get('categoryName');

    const filteredProducts = products.filter(product => {
        // Start with category filter
        const matchesCategory = categoryId ? product.category === categoryId : true;

        // Add search filter
        const matchesSearch = searchQuery
            ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 py-2">
            {/* Mobile Filter Toggle Button */}
            <button
                className="md:hidden mb-4 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                <span>Show Filters</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            </button>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Filters */}
                <aside className={`
                    w-full md:w-1/4 h-fit sticky top-4
                    transform transition-transform duration-300 ease-in-out
                    md:transform-none
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:block
                    ${isSidebarOpen ? 'absolute md:relative z-50 md:z-auto' : 'hidden md:block'}
                `}>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-semibold text-gray-800">Filters</h3>
                            {activeFiltersCount > 0 && (
                                <>
                                    <button
                                        onClick={resetFilters}
                                        className="text-sm text-blue-500 hover:text-blue-700"
                                    >
                                        Reset All
                                    </button>
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="text-sm md:hidden text-blue-500 hover:text-blue-700"
                                    >
                                        Applay Filters
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="filter-group">
                                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">All Categories</option>
                                    {categories.length > 0 && categories.map((category) => (
                                        category.parent === null && (
                                            <option key={category._id} value={category._id}>{category.name}</option>
                                        )
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="subcategory" className="block text-gray-700 font-medium mb-2">
                                    Subcategory
                                </label>
                                <select
                                    id="subcategory"
                                    name="subcategory"
                                    value={filters.subcategory}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">All Subcategories</option>
                                    {subcategories.length > 0 && subcategories.map((subcat) => (
                                        <option key={subcat._id} value={subcat._id}>{subcat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="size" className="block text-gray-700 font-medium mb-2">
                                    Size
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => handleFilterChange({ target: { name: 'size', value: size === filters.size ? '' : size } })}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                                                ${filters.size === size
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="color" className="block text-gray-700 font-medium mb-2">
                                    Color
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {['Black', 'White', 'Red', 'Blue', 'Green'].map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => handleFilterChange({ target: { name: 'color', value: color === filters.color ? '' : color } })}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                                                ${filters.color === color
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-group">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Price Range
                                </label>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>${filters.priceMin}</span>
                                        <span>${filters.priceMax}</span>
                                    </div>
                                    <input
                                        type="range"
                                        name="priceMin"
                                        min="0"
                                        max="1000"
                                        value={filters.priceMin}
                                        onChange={handleFilterChange}
                                        className="w-full accent-blue-500"
                                    />
                                    <input
                                        type="range"
                                        name="priceMax"
                                        min="0"
                                        max="1000"
                                        value={filters.priceMax}
                                        onChange={handleFilterChange}
                                        className="w-full accent-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Product Listing */}
                <main className="w-full md:w-3/4">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {searchQuery
                                        ? `Search Results for "${searchQuery}"`
                                        : categoryName
                                            ? `${decodeURIComponent(categoryName)}`
                                            : 'All Products'
                                    }
                                </h2>
                                {searchQuery && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        Found {filteredProducts.length} products
                                    </p>
                                )}
                            </div>
                            <select
                                id="sort"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Sort By</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="newest">Newest Arrivals</option>
                            </select>
                        </div>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                Error: {error}
                            </div>
                        )}

                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {!filteredProducts.length && (
                                    <div className="col-span-full text-center text-gray-500 py-8">
                                        No products found
                                    </div>
                                )}
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProductList;
