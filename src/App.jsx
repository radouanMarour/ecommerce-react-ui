import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import Dashboard from './pages/admin/Dashboard';
import ProductListing from './pages/ProductListing';
import Breadcrumb from './components/Breadcrumb';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import OrdersPage from './pages/OrdersPage';
import Footer from './components/Footer';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {

  return (
    <Router>
      <Header />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Breadcrumb />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/products/:id" element={<ProductPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout/shipping" element={<ShippingPage />} />
              <Route path="/checkout/payment" element={<PaymentPage />} />
              <Route path="/checkout/placeorder" element={<PlaceOrderPage />} />
              <Route path="/orders/:id" element={<OrderDetailsPage />} />
              <Route path="/orders/myorders" element={<OrdersPage />} />
              <Route path="/admin/dashboard/*" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
