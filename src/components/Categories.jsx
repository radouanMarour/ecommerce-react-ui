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
        <div className='mr-auto ml-6'>
            <div
                onClick={() => setDropDowOpen(!dropdownOpen)}
                className='cursor-pointer font-semibold text-lg'
            >
                Categories
            </div>
            <div
                className={`${dropdownOpen ? 'absolute' : 'hidden'} top-full w-60 py-4 shadow-md z-10 bg-white`}
                onMouseLeave={() => setDropDowOpen(false)}
            >
                <ul className='w-full relative'>
                    {
                        categories?.map((cat, index) => {
                            if (!cat.parent)
                                return (
                                    <li
                                        key={index}
                                        className='w-full'
                                        onMouseEnter={() => setActiveCategory(index)}
                                        onClick={() => setActiveCategory(index)}
                                        onMouseLeave={() => setActiveCategory(null)}
                                    >
                                        <Link to="/" className='block hover:bg-blue-100 px-2 py-1'>
                                            {cat.name}
                                        </Link>
                                        <ul className={`${activeCategory === index ? 'absolute' : 'hidden'} left-full -top-4 p-4 w-full shadow-md z-10 bg-white`}>
                                            {
                                                cat.subcategories.map((subcat, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            to="/"
                                                            className='block hover:bg-blue-100 px-2 py-1'
                                                        >
                                                            {subcat.name}
                                                        </Link>
                                                    </li>
                                                ))
                                            }

                                        </ul>
                                    </li>
                                )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Categories