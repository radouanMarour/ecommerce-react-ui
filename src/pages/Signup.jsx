import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import { useDispatch, useSelector } from 'react-redux'
import { signupAsync } from '../api/authApi';
import { clear } from '../redux/slices/authSlice';
import Alert from '../components/Alert';
import { AnimatePresence } from 'motion/react';

const Signup = () => {
    const { status, error, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        dispatch(clear())
        dispatch(signupAsync(formData))
        navigate('/login')
    };

    return (
        <div className="signup-page">
            <h1>Sign Up</h1>
            <AnimatePresence>
                {error && <Alert message={error} type={"error"} />}
                {message && <Alert message={message} type={"success"} />}
            </AnimatePresence>
            <form onSubmit={handleSignup}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">
                    {status === 'pending' ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
            <p>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    );
};

export default Signup;
