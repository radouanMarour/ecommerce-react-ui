import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync } from '../api/authApi';
import { clear } from '../redux/slices/authSlice';
import { AnimatePresence } from 'motion/react';
import Alert from '../components/Alert';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { status, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(clear())
        const result = await dispatch(loginAsync({ email, password })).unwrap()
        result && navigate("/")
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <AnimatePresence>
                {error && <Alert message={error} type={"error"} />}
            </AnimatePresence>
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
                    {status === 'pending' ? "Logging in..." : "Login"}
                </button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
