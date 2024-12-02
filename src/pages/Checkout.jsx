import React, { useState } from 'react';
import '../styles/Checkout.css';

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePlaceOrder = () => {
        alert(`Order placed successfully for ${formData.name}`);
    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            <div className="checkout-container">
                {/* Shipping Information */}
                <div className="shipping-info">
                    <h2>Shipping Information</h2>
                    <form>
                        <label>
                            Full Name:
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                        </label>
                        <label>
                            Address:
                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                        </label>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <p>Subtotal: $249.97</p>
                    <p>Tax: $24.99</p>
                    <p>Total: $274.96</p>
                    <button className="place-order" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
