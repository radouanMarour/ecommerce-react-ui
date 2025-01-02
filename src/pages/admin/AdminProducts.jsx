import React, { useEffect } from 'react';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    ToggleOff,
    ToggleOn
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchProducts, updateProduct } from '../../api/productApi';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';


const AdminProducts = () => {
    const { products, loading } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = async (productId) => {
        const confirmed = window.confirm('Are you sure you want to delete this product?');
        if (confirmed) {
            dispatch(deleteProduct(productId));
        }
    };

    const handleToggleFeatured = (productId, isFeatured) => {
        dispatch(updateProduct({ productId, formData: { isFeatured: !isFeatured } }));
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>

            <Link
                to="/dashboard/products/add"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 inline-block"
            >
                <AddIcon /> Add Product
            </Link>

            <div className="bg-white shadow-md rounded p-4 mb-6">
                <h3 className="text-xl font-medium mb-4">Products</h3>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Image</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Price</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Sold</th>
                                <th className="px-4 py-2 text-left">Featured</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map(product => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">
                                        <img
                                            src={product.images[0]} alt={product.name}
                                            className='w-10 h-10 object-contain'
                                        />
                                    </td>
                                    <td className="border px-4 py-2">{product.name}</td>
                                    <td className="border px-4 py-2">${product.price}</td>
                                    <td className="border px-4 py-2">{product.category.name}</td>
                                    <td className="border px-4 py-2">{product.sold}</td>
                                    <td className="border px-4 py-2">
                                        <button className=" w-full flex items-center" onClick={() => handleToggleFeatured(product._id, product.isFeatured)}>
                                            {product.isFeatured ? <ToggleOn className='text-green-400 text-4xl' /> : <ToggleOff className='text-gray-400 text-4xl' />}
                                        </button>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <Link to={`/dashboard/products/edit/${product._id}`}
                                            className="text-blue-500 hover:text-blue-700 mr-2"
                                        >
                                            <EditIcon />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;