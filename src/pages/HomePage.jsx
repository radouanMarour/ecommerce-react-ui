import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation';

import { fetchProducts } from '../api/productApi'
import { fetchCategories } from '../api/categoryApi'

const HomePage = () => {
    const { loading, products } = useSelector(state => state.product)
    const { categories } = useSelector(state => state.category)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
    }, [dispatch])

    const bestSellers = products
        .slice(0, 3)
        .map(product => ({
            ...product,
            bgColor: "bg-primary bg-opacity-10" // You can randomize these if needed
        }))
    const featuredProducts = products
        .slice(0, 6)
        .map(product => ({
            ...product,
        }))

    return (
        <div className="container mx-auto px-4 md:pt-16">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={true}
                speed={1000}
                pagination={{ clickable: true }}
                className="mb-8 mt-4"
            >
                {bestSellers.map((product) => (
                    <SwiperSlide key={product._id}>
                        <div className={`${product.bgColor} p-8 rounded-lg min-h-[400px] flex items-center`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
                                <div className="max-w-2xl">
                                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                                    <p className="text-gray-600 mb-2">{product.description}</p>
                                    <p className="text-2xl font-bold text-blue-600 mb-6">${product.price}</p>
                                    <Link
                                        to={`/products/${product._id}`}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        View Product
                                    </Link>
                                </div>
                                <div className="bg-gray-200 rounded-lg w-full order-1">
                                    <img src={product.images?.[0]} alt="" className='w-full' />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Featured Products */}
            <section>
                <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    loop={true}
                    speed={800}
                    className="pb-8 relative group"
                >
                    {featuredProducts.map((product) => (
                        <SwiperSlide key={product._id}>
                            <div className="border rounded-lg p-4 hover:shadow-lg transition">
                                <div className="bg-gray-200 w-full rounded-md mb-4">
                                    <img src={product.images?.[0]} alt='' />
                                </div>
                                <h3 className="font-semibold">{product.name}</h3>
                                <p className="text-gray-600">${product.price}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="swiper-button-prev !text-gray-800 !left-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="swiper-button-next !text-gray-800 !right-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Swiper>
            </section>

            {/* Categories Section */}
            <section className="my-12">
                <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        !category.parent &&
                        <Link
                            to={`/products?category=${category._id}&categoryName=${encodeURIComponent(category.name)}`}
                            key={category._id}
                            className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 cursor-pointer"
                        >
                            <h3 className="font-medium">{category.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>
        </div >
    )
}

export default HomePage