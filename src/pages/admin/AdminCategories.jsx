import React, { useEffect } from 'react';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { deleteCategory, fetchCategories } from '../../api/categoryApi';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';


const AdminCategories = () => {
    const { categories, loading } = useSelector((state) => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleDelete = async (categoryId) => {
        const confirmed = window.confirm('Are you sure you want to delete this category?');
        if (confirmed) {
            dispatch(deleteCategory(categoryId));
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>

            <Link
                to="/dashboard/categories/add"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 inline-block"
            >
                <AddIcon /> Add Category
            </Link>

            <div className="bg-white shadow-md rounded p-4 mb-6">
                <h3 className="text-xl font-medium mb-4">Categories</h3>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Category Name</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.map(category => (
                                <tr key={category._id} className="hover:bg-gray-50">
                                    <td
                                        className={`border py-2 ${category.parent ? "px-6" : "px-2 font-semibold"}`}
                                    >
                                        {category.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <Link to={`/dashboard/categories/edit/${category._id}`}
                                            className="text-blue-500 hover:text-blue-700 mr-2"
                                        >
                                            <EditIcon />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category._id)}
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

export default AdminCategories;