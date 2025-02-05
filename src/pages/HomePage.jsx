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
                        <Link to={`/products/${product._id}`} className={`p-8 rounded-lg min-h-[400px] flex items-center`}>
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
                                <div className="rounded-lg w-full order-1">
                                    <img src={product.images?.[0]} alt="" className='w-full h-72 object-contain' />
                                </div>
                            </div>
                        </Link>
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
                    navigation={true}
                    loop={true}
                    speed={800}
                    className="pb-8 relative group"
                >
                    {featuredProducts.map((product) => (
                        <SwiperSlide key={product._id}>
                            <Link to={`/products/${product._id}`} className="border rounded-lg p-4 hover:shadow-lg transition block">
                                <div className="bg-gray-200 w-full rounded-md mb-4">
                                    <img
                                        src={product.images?.[0]}
                                        alt=''
                                        className="bg-gray-200 w-full h-60 object-contain"
                                    />
                                </div>
                                <h3 className="font-semibold">{product.name}</h3>
                                <p className="text-gray-600">${product.price}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
                    {/* <div className="swiper-button-prev !text-gray-800 !left-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="swiper-button-next !text-gray-800 !right-0 opacity-0 group-hover:opacity-100 transition-opacity"></div> */}
                </Swiper>
            </section>

            {/* Categories Section */}
            <section className="my-12">
                <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        !category.parent &&
                        <Link
                            to={`/products?category=${category.name.toLowerCase()}`}
                            key={category._id}
                            className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 cursor-pointer"
                        >
                            <div className="flex flex-col items-center">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-24 h-24 object-contain mb-4"
                                />
                                <h3 className="font-medium">{category.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div >
    )
}

export default HomePage