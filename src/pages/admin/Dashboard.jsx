import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import AdminHome from './AdminHome';
import AdminCategories from './AdminCategories';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import AdminProducts from './AdminProducts';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar className="w-1/4 bg-white shadow-md" />
            <div className="flex-1 pb-8 md:p-6">
                <Routes>
                    <Route path="/" element={<AdminHome />} />
                    <Route path="/categories" element={<AdminCategories />} />
                    <Route path="/categories/add" element={<AddCategory />} />
                    <Route path="/categories/edit/:id" element={<EditCategory />} />
                    <Route path="/products" element={<AdminProducts />} />
                    <Route path="/products/add" element={<AddProduct />} />
                    <Route path="/products/edit/:id" element={<EditProduct />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;