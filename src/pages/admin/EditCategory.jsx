import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchCategoryById, updateCategory } from '../../api/categoryApi';
import { notifyError, notifySuccess } from '../../utils/notifications';
import { clearMessage } from '../../redux/slices/categorySlice';
import Spinner from '../../components/Spinner';
import instance from '../../utils/axios';
import Loader from '../../components/Loader';

const EditCategory = () => {
    const { token } = useSelector((state) => state.auth);

    const { categories, category, loading, error, message } = useSelector((state) => state.category);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(
        {
            name: '',
            image: '',
            parent: ''
        }
    );

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchCategoryById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                image: '',
                parent: category.parent || ''
            });
        }
    }, [category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = async (e) => {
        const data = new FormData();
        data.append('image', e.target.files[0]);
        const response = await instance.post('/upload/single', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setFormData({
            ...formData,
            image: response.data.fileUrl
        });
    };

    useEffect(() => {
        if (error) {
            notifyError(error);
        }
        if (message) {
            notifySuccess(message);
        }
        dispatch(clearMessage())
    }, [error, message]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) {
            delete formData.image;
        }
        if (formData.parent === '') {
            delete formData.parent;
        }
        const response = await dispatch(updateCategory({ categoryId: id, formData, token })).unwrap();
        if (response.category)
            navigate('/dashboard/categories');
    };

    const handleCancel = () => {
        navigate('/dashboard/categories');
    };

    if (loading) {
        return <Loader />
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Edit Category</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={handleFileChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="parent" className="block text-sm font-medium text-gray-700">
                            Subcategory of:
                        </label>
                        <select
                            name="parent"
                            id="parent"
                            value={formData.parent}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">None</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-full flex justify-evenly items-center py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? <><Spinner /> Updating...</> : 'Update Category'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-4"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCategory;