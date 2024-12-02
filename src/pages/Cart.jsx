import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Casual Shirt', price: 49.99, quantity: 1, image: 'https://via.placeholder.com/300x400?text=Casual+Shirt' },
        { id: 2, name: 'Leather Boots', price: 99.99, quantity: 2, image: 'https://via.placeholder.com/300x400?text=Leather+Boots' },
    ]);

    const updateQuantity = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const calculateTotal = () => {
        const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const tax = subtotal * 0.1; // Assume 10% tax
        const total = subtotal + tax;
        return { subtotal, tax, total };
    };

    const { subtotal, tax, total } = calculateTotal();

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-container">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>${item.price.toFixed(2)}</p>
                                    <div className="quantity-control">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                        />
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button className="remove-item" onClick={() => removeItem(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <p>Subtotal: ${subtotal.toFixed(2)}</p>
                        <p>Tax: ${tax.toFixed(2)}</p>
                        <p>Total: ${total.toFixed(2)}</p>
                        <Link to="/checkout" className="checkout-button">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
