import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories } from '../api/categoryApi'

const Categories = () => {
    const { categories } = useSelector(state => state.category)
    const [dropdownOpen, setDropDowOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    return (
        <div className='relative mr-auto ml-6'>
            <div
                onClick={() => setDropDowOpen(!dropdownOpen)}
                className='flex items-center gap-1 cursor-pointer font-semibold text-lg hover:text-blue-600 transition-colors duration-200'
            >
                <span>Categories</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            <div
                className={`${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    } absolute top-full w-64 py-3 shadow-lg z-20 bg-white rounded-md transition-all duration-200 transform`}
                onMouseLeave={() => setDropDowOpen(false)}
            >
                <ul className='w-full relative'>
                    {categories?.map((cat, index) => {
                        if (!cat.parent)
                            return (
                                <li
                                    key={index}
                                    className='w-full relative group'
                                    onMouseEnter={() => setActiveCategory(index)}
                                    onClick={() => setActiveCategory(index)}
                                    onMouseLeave={() => setActiveCategory(null)}
                                >
                                    <Link
                                        to={`/products?category=${cat.name.toLowerCase()}`}
                                        className='px-4 py-2 hover:bg-blue-50 transition-colors duration-200 flex items-center justify-between'
                                    >
                                        <span>{cat.name}</span>
                                        {cat.subcategories.length > 0 && (
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </Link>
                                    <ul
                                        className={`
                                            ${activeCategory === index ? 'opacity-100 visible' : 'opacity-0 invisible'}
                                            absolute left-full top-0 w-64 bg-white shadow-lg rounded-md py-3 
                                            transition-all duration-200 transform
                                        `}
                                    >
                                        {cat.subcategories.map((subcat, subIndex) => (
                                            <li key={subIndex}>
                                                <Link
                                                    to={`/products?category=${cat.name.toLowerCase()}&subcategory=${subcat.name.toLowerCase()}`}
                                                    className='block px-4 py-2 hover:bg-blue-50 transition-colors duration-200'
                                                >
                                                    {subcat.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Categories