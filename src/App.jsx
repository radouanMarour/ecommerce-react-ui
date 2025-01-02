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

const App = () => {

  return (
    <Router>
      <Header />
      <Breadcrumb />
      <div className="pt-1 md:pt-2">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
