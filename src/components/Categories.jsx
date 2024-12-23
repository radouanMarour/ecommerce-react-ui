import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const categories = [
    {
        "category": "Clothing",
        "subcategories": [
            "T-Shirts",
            "Shirts",
            "Polo Shirts",
            "Sweaters"
        ]
    },
    {
        "category": "Footwear",
        "subcategories": [
            "Casual Shoes",
            "Formal Shoes",
            "Sneakers",
            "Boots",
        ]
    },
    {
        "category": "Accessories",
        "subcategories": [
            "Watches",
            "Belts",
            "Wallets",
            "Sunglasses"
        ]
    }
]

const Categories = () => {
    const [dropdownOpen, setDropDowOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState(null)

    return (
        <div className='mr-auto ml-6'>
            <div
                onClick={() => setDropDowOpen(!dropdownOpen)}
                className='cursor-pointer font-semibold text-lg'
            >
                Categories
            </div>
            <div
                className={`${dropdownOpen ? 'absolute' : 'hidden'} top-full w-60 py-4 shadow-md`}
                onMouseLeave={() => setDropDowOpen(false)}
            >
                <ul className='w-full relative'>
                    {
                        categories.map((cat, index) => {
                            return (
                                <li
                                    className='w-full'
                                    onMouseEnter={() => setActiveCategory(index)}
                                    onMouseClick={() => setActiveCategory(index)}
                                    onMouseLeave={() => setActiveCategory(null)}
                                >
                                    <Link to="/" className='block hover:bg-blue-100 px-2 py-1'>
                                        {cat.category}
                                    </Link>
                                    <ul className={`${activeCategory === index ? 'absolute' : 'hidden'} left-full top-0 p-4 w-full h-full`}>
                                        {
                                            cat.subcategories.map((subcat, subIndex) => (
                                                <li>
                                                    <Link
                                                        to="/"
                                                        className='block hover:bg-blue-100 px-2 py-1'
                                                    >
                                                        {subcat}
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