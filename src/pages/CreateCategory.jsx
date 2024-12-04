import React, { useState, useEffect } from 'react';
import '../styles/CreateCategory.css';
import { createCategory, getCategories } from '../api/categoryApi';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [parent, setParent] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Fetch existing categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories(); // Replace with your API endpoint
                setCategories(response.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
        fetchCategories();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const payload = { name, parent: parent || null };
            const response = await createCategory(payload);
            console.log(response)

            response.message && setMessage(response.message);
            setName('');
            setParent('');
        } catch (err) {
            console.error('Error creating category:', err);
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-category-page">
            <h1>Add New Category</h1>
            <form onSubmit={handleSubmit} className="add-category-form">
                {/* Category Name */}
                <label>
                    Category Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter category name"
                        required
                    />
                </label>

                {/* Parent Category Selector */}
                <label>
                    Parent Category:
                    <select
                        value={parent}
                        onChange={(e) => setParent(e.target.value)}
                    >
                        <option value="">None</option>
                        {categories?.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Saving...' : 'Add Category'}
                </button>

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default CreateCategory;
