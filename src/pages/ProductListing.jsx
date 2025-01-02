import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/productApi';
import { fetchCategories } from '../api/categoryApi';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';

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
    return (
        <div className="p-4 flex flex-col md:flex-row">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-1/4 bg-gray-100 rounded-md p-4 mt-6 md:mr-4">
                <h3 className="text-xl font-medium mb-4">Filter</h3>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-1">
                        Category:
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 w-full"
                    >
                        <option value="">All Categories</option>
                        {
                            categories.length > 0 && categories.map((category) => {
                                if (category.parent === null) {
                                    return <option key={category._id} value={category._id}>{category.name}</option>
                                }
                            })
                        }
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="subcategory" className="block text-gray-700 text-sm font-bold mb-1">
                        Subcategory:
                    </label>
                    <select
                        id="subcategory"
                        name="subcategory"
                        value={filters.subcategory}
                        onChange={handleFilterChange}
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 w-full"
                    >
                        <option value="">All Subategories</option>
                        {
                            subcategories.length && subcategories.map((subcat) => {
                                return <option key={subcat._id} value={subcat._id}>{subcat.name}</option>
                            })
                        }
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="size" className="block text-gray-700 text-sm font-bold mb-1">
                        Size:
                    </label>
                    <select
                        id="size"
                        name="size"
                        value={filters.size}
                        onChange={handleFilterChange}
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 w-full"
                    >
                        <option value="">All Sizes</option>
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-1">
                        Color:
                    </label>
                    <select
                        id="color"
                        name="color"
                        value={filters.color}
                        onChange={handleFilterChange}
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 w-full"
                    >
                        <option value="">All Colors</option>
                        {['Black', 'White', 'Red', 'Blue', 'Green'].map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-1">
                        Price Range:
                    </label>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>${filters.priceMin}</span>
                        <span>${filters.priceMax}</span>
                    </div>
                    <input
                        type="range"
                        name="priceMin"
                        min="0"
                        max="1000"
                        step="1"
                        value={filters.priceMin}
                        onChange={handleFilterChange}
                        className="w-full mt-2"
                    />
                    <input
                        type="range"
                        name="priceMax"
                        min="0"
                        max="1000"
                        step="1"
                        value={filters.priceMax}
                        onChange={handleFilterChange}
                        className="w-full mt-2"
                    />
                </div>
            </aside>

            {/* Product Listing */}
            <div className="w-full md:w-3/4 p-4">
                <div className='flex justify-end items-center'>

                    <div className="mb-4">
                        <select
                            id="sort"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 w-full"
                        >
                            <option value="">Sort By:</option>
                            <option value="price_asc">Price (Low to High)</option>
                            <option value="price_desc">Price (High to Low)</option>
                            <option value="newest">Newest Arrivals</option>
                        </select>
                    </div>
                </div>
                {loading ? <Loader /> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {!products.length && <div>No products found</div>}
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>}
            </div>
        </div>
    );
};

export default ProductList;
