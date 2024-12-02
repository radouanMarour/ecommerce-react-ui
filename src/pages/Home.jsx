import React from 'react'
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import FeaturedCategories from "../components/FeaturedCategories";
import Newsletter from '../components/Newsletter';

const Home = () => {
    return (
        <div className='home'>
            <Hero />
            <FeaturedCategories />
            <FeaturedProducts />
            <Newsletter />
        </div>
    )
}

export default Home