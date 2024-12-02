import React, { useState } from 'react';
import '../styles/Newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setMessage('Thank you for subscribing!');
            setEmail(''); // Clear the input field
        } else {
            setMessage('Please enter a valid email address.');
        }
    };

    return (
        <section className="newsletter">
            <div className="newsletter-content">
                <h2>Subscribe to Our Newsletter</h2>
                <p>Stay updated on the latest fashion trends, exclusive offers, and more.</p>
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="newsletter-input"
                    />
                    <button type="submit" className="newsletter-button">Subscribe</button>
                </form>
                {message && <p className="newsletter-message">{message}</p>}
            </div>
        </section>
    );
};

export default Newsletter;
