import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/Hero.css';
import image from '../assets/hero.jpg'

const Hero = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const slides = [
        {
            title: 'Explore Our Latest Clothing Collection',
            description: 'Shop the trendiest shirts, jackets, and more.',
            image: 'https://via.placeholder.com/1200x600?text=Clothing+Collection',
            link: '/clothing',
        },
        {
            title: 'Step into Style with Premium Shoes',
            description: 'Find sneakers, boots, and dress shoes that define your look.',
            image: 'https://via.placeholder.com/1200x600?text=Shoes+Collection',
            link: '/shoes',
        },
        {
            title: 'Complete Your Look with Accessories',
            description: 'Belts, watches, wallets, and hats for every occasion.',
            image: 'https://via.placeholder.com/1200x600?text=Accessories',
            link: '/accessories',
        },
    ];

    return (
        <div className="hero-carousel">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="carousel-slide">
                        <img src={image} alt={slide.title} className="carousel-image" />
                        <div className="carousel-text">
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                            <a href={slide.link} className="carousel-button">Shop Now</a>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Hero;
