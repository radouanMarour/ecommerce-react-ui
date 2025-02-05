import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/productApi';
import { fetchCategories } from '../api/categoryApi';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
    standardSizes,
    numericSizes,
    customFormats,
    europeanSizes,
    frenchSizes,
    colors
} from '../data';

const sizes = [
    ...standardSizes,
    ...numericSizes,
    ...customFormats,
    ...europeanSizes,
    ...frenchSizes,
]

const ProductList = () => {
    const { products, loading, error } = useSelector((state) => state.product);
    const { categories } = useSelector((state) => state.category);
    const [sortOption, setSortOption] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({
        category: '',
        subcategory: '',
        size: '',
        color: '',
        priceMin: 0,
        priceMax: 1000,
    });

    const searchQuery = searchParams.get('search');
    const categoryName = searchParams.get('category');
    const subcategoryName = searchParams.get('subcategory');

    useEffect(() => {
        if (categoryName) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                category: categoryName,
            }));
        }
        if (subcategoryName) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                subcategory: subcategoryName,
            }));
        }
    }, [searchParams]);

    useEffect(() => {
        const params = new URLSearchParams({
            ...filters,
            category: categoryName,
            ...(subcategoryName && { subcategory: subcategoryName }),
            ...(sortOption && { sort: sortOption }),
            ...(searchQuery && { search: searchQuery }),
        });

        dispatch(fetchProducts(params));
    }, [filters, sortOption, categoryName, subcategoryName, searchQuery]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: prevFilters[name] === value ? '' : value,
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
        navigate('/products')
    };

    const activeFiltersCount = Object.values(filters).filter(
        (value) => value !== '' && value !== 0
    ).length;

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
                                <h3 className="block text-gray-700 font-medium mb-4">Categories</h3>
                                <ul className="space-y-2">
                                    {categories.map((category) => {
                                        if (!category.parent) {
                                            return (
                                                <li key={category._id}>
                                                    <button
                                                        onClick={() => navigate(`/products?category=${category.name.toLowerCase()}`)}
                                                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                                                            ${filters.category === category._id
                                                                ? 'bg-blue-500 text-white'
                                                                : 'text-gray-700 hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        {category.name}
                                                    </button>
                                                    {filters.category === category.name.toLowerCase() && category.subcategories && (
                                                        <ul className="ml-4 mt-2 space-y-2">
                                                            {category.subcategories.map((subcat) => (
                                                                <li key={subcat._id}>
                                                                    <button
                                                                        onClick={() => navigate(`/products?category=${category.name.toLowerCase()}&subcategory=${subcat.name.toLowerCase()}`)}
                                                                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                                                                            ${filters.subcategory === subcat._id
                                                                                ? 'bg-blue-500 text-white'
                                                                                : 'text-gray-600 hover:bg-gray-100'
                                                                            }`}
                                                                    >
                                                                        {subcat.name}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}
                                </ul>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="size" className="block text-gray-700 font-medium mb-2">
                                    Size
                                </label>
                                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-scroll">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => handleFilterChange({ target: { name: 'size', value: size === filters.size ? '' : size } })}
                                            className={`px-4 py-2 rounded-md text-xs font-medium transition-colors
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
                                <div className="flex flex-wrap gap-2 max-h-64 overflow-y-scroll">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => handleFilterChange({ target: { name: 'color', value: color === filters.color ? '' : color } })}
                                            className={`px-4 py-2 rounded-md text-xs font-medium transition-colors
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
                                <h2 className="text-sm font-semibold text-gray-800 capitalize">
                                    {searchQuery
                                        ? `Search Results for "${searchQuery}"`
                                        : categoryName
                                            ? subcategoryName
                                                ? `${decodeURIComponent(categoryName)} / ${decodeURIComponent(subcategoryName)}`
                                                : decodeURIComponent(categoryName)
                                            : 'All Products'
                                    }
                                </h2>
                                {searchQuery && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        Found {products.length} products
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

                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {!products.length && (
                                    <div className="col-span-full text-center text-gray-500 py-8">
                                        No products found
                                    </div>
                                )}
                                {products.map((product) => (
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
