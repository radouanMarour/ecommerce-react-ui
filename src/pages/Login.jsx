import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync } from '../api/authApi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginAsync({ email, password }))
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">
                    {loading === 'pending' ? "Logging in..." : "Login"}
                </button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
