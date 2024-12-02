import React, { useState } from 'react';
import '../styles/CreateProduct.css';

const CreateProduct = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Clothing', subcategories: ['Shirts', 'Pants', 'Jackets'] },
        { id: 2, name: 'Shoes', subcategories: ['Sneakers', 'Boots'] },
        { id: 3, name: 'Accessories', subcategories: ['Belts', 'Watches', 'Hats'] },
    ]);

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        subcategory: '',
        price: '',
        description: '',
        sizes: [],
        colors: [],
        images: [],
    });

    const [currentSize, setCurrentSize] = useState('');
    const [currentColor, setCurrentColor] = useState('');
    const [imageFiles, setImageFiles] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddSize = () => {
        if (currentSize.trim()) {
            setFormData({ ...formData, sizes: [...formData.sizes, currentSize.trim()] });
            setCurrentSize('');
        }
    };

    const handleAddColor = () => {
        if (currentColor.trim()) {
            setFormData({ ...formData, colors: [...formData.colors, currentColor.trim()] });
            setCurrentColor('');
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles([...imageFiles, ...files]);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setFormData({ ...formData, images: [...formData.images, ...imageUrls] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        console.log('Product Created:', formData);
        alert('Product created successfully!');
        // Clear form after submission
        setFormData({
            name: '',
            category: '',
            subcategory: '',
            price: '',
            description: '',
            sizes: [],
            colors: [],
            images: [],
        });
        setImageFiles([]);
    };

    return (
        <div className="create-product-page">
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit} className="product-form">
                {/* Product Name */}
                <div className="form-group">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Category */}
                <div className="form-group">
                    <label>Category:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Subcategory */}
                <div className="form-group">
                    <label>Subcategory:</label>
                    <select
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Subcategory</option>
                        {categories
                            .find((cat) => cat.name === formData.category)?.subcategories.map(
                                (sub, index) => (
                                    <option key={index} value={sub}>
                                        {sub}
                                    </option>
                                )
                            )}
                    </select>
                </div>

                {/* Price */}
                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Description */}
                <div className="form-group description">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Sizes */}
                <div className="form-group">
                    <label>Sizes:</label>
                    <div className="inline-input">
                        <input
                            type="text"
                            value={currentSize}
                            onChange={(e) => setCurrentSize(e.target.value)}
                            placeholder="Add size"
                        />
                        <button type="button" onClick={handleAddSize}>
                            Add
                        </button>
                    </div>
                    <div className="tags">
                        {formData.sizes.map((size, index) => (
                            <span key={index} className="tag">
                                {size}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Colors */}
                <div className="form-group">
                    <label>Colors:</label>
                    <div className="inline-input">
                        <input
                            type="text"
                            value={currentColor}
                            onChange={(e) => setCurrentColor(e.target.value)}
                            placeholder="Add color"
                        />
                        <button type="button" onClick={handleAddColor}>
                            Add
                        </button>
                    </div>
                    <div className="tags">
                        {formData.colors.map((color, index) => (
                            <span key={index} className="tag">
                                {color}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Images */}
                <div className="form-group">
                    <label>Images:</label>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                    <div className="image-previews">
                        {imageFiles.map((file, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                alt={`Product ${index + 1}`}
                                className="image-preview"
                            />
                        ))}
                    </div>
                </div>

                <button type="submit" className="submit-button">
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
