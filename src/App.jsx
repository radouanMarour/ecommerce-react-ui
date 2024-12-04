import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import SearchResults from './pages/SearchResults';
import CreateProduct from './pages/CreateProduct';
import './App.css'
import Header from './components/Header';
import CreateCategory from './pages/CreateCategory';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Home  */}
        <Route path="/" element={<Home />} />

        {/* Product Listing */}
        <Route path="/category/:categoryName" element={<ProductListing />} />
        <Route path="/category/:categoryName/:subCategoryName" element={<ProductListing />} />

        {/* Product Details */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Checkout */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Login and Signup */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Profile />} />

        {/* Search Results */}
        <Route path="/search" element={<SearchResults />} />

        {/* Create Product (Admin ) */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/create-product" element={<CreateProduct />} />
        <Route path="/admin/create-category" element={<CreateCategory />} />
      </Routes>
    </Router>
  );
};

export default App;
