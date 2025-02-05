import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById, fetchProducts, updateProduct } from '../../api/productApi';
import { fetchCategories } from '../../api/categoryApi';
import instance from '../../utils/axios';
import { notifyError, notifySuccess } from '../../utils/notifications';
import { clearMessage } from '../../redux/slices/productSlice';
import Spinner from '../../components/Spinner';
import AddVariant from '../../components/admin/AddVariant';
import { Delete, FileUploadOutlined } from '@mui/icons-material';

const EditProduct = () => {
    const { token } = useSelector((state) => state.auth);
    const { categories } = useSelector((state) => state.category);
    const { product, loading, error, message } = useSelector((state) => state.product);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("")
    const [showAddVariant, setShowAddVariant] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [filePreviews, setFilePreviews] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: "",
        price: 0,
        stock: 0,
        category: "",
        subcategory: "",
        images: "",
        variants: []

    });

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || "",
                price: product.price || 0,
                stock: product.stock || 0,
                category: product.category._id || "",
                subcategory: product.subcategory._id || "",
                images: product.images || [],
                variants: product.variants || []

            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            setSelectedCategory(categories.find(cat => cat._id === value))
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = async (e) => {
        const data = new FormData();
        const files = Array.from(e.target.files);
        files.forEach((file) => {
            data.append("images", file);
        });
        const previews = files.map(file => ({
            file,
            previewUrl: URL.createObjectURL(file)
        }));

        setFilePreviews(previews);
        const response = await instance.post('/upload/multiple', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
            onUploadProgress: (progressEvent) => {
                setUploadProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
            }
        });
        console.log(response.data)
        if (response.data.data && response.data.data.length > 0) {
            notifySuccess("Images uploaded successfully")
        } else {
            notifyError("Failed to upload the images, try again")
        }
        setFormData({
            ...formData,
            images: response.data.data
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

    const deleteVariant = (index) => {
        const variants = [...formData.variants];
        variants.splice(index, 1);
        setFormData({
            ...formData,
            variants
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.images.length === 0) {
            delete formData.images;
        }
        const response = await dispatch(updateProduct({ productId: id, formData, token })).unwrap();
        if (response)
            navigate('/admin/dashboard/products');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-3xl p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Edit Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className='md:mt-4'>
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
                    <div className='md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-3'>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            cols={10}
                            rows={5}
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            type="number"
                            step={0.01}
                            min={0}
                            name="price"
                            id="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category:
                        </label>
                        <select
                            name="category"
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">None</option>
                            {categories.map((cat) => {
                                if (!cat.parent)
                                    return (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    )
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
                            Subcategory:
                        </label>
                        <select
                            name="subcategory"
                            id="subcategory"
                            value={formData.subcategory}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">None</option>
                            {selectedCategory && selectedCategory.subcategories.map((subcat) => (
                                <option key={subcat._id} value={subcat._id}>
                                    {subcat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                            Stock
                        </label>
                        <input
                            type="number"
                            min={0}
                            name="stock"
                            id="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="images"
                            className="flex mt-4 justify-between items-center text-sm font-medium text-gray-700 cursor-pointer"
                        >
                            {uploadProgress !== 0 &&
                                <span className="text-green-600 ml-2">
                                    {uploadProgress}% Uploaded
                                </span>
                            }
                            <div className="mt-2 px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 inline-block">
                                <FileUploadOutlined /> Select Files
                            </div>
                        </label>
                        <input
                            multiple
                            type="file"
                            name="images"
                            id="images"
                            onChange={handleFileChange}
                            className="hidden mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex items-center justify-end gap-1 md:col-start-1 md:col-end-3">
                        {filePreviews?.map((file, index) => (
                            <img
                                key={index}
                                src={file.previewUrl}
                                alt="preview"
                                className="w-10 h-10 object-cover"
                            />
                        ))}
                    </div>
                    <div className="col-start-1 col-end-3">
                        <h3 className="text-lg font-semibold">Variants</h3>
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left">Color</th>
                                    <th className="px-4 py-2 text-left">Size</th>
                                    <th className="px-4 py-2 text-left">Price</th>
                                    <th className="px-4 py-2 text-left">Stock</th>
                                    <th className="px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.variants.map((variant, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{variant.color}</td>
                                        <td className="border px-4 py-2">{variant.size}</td>
                                        <td className="border px-4 py-2">{variant.price}</td>
                                        <td className="border px-4 py-2">{variant.stock}</td>
                                        <td
                                            className="border px-4 py-2 text-center cursor-pointer"
                                            onClick={() => deleteVariant(index)}
                                        >
                                            <Delete className='text-red-500' />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {
                        showAddVariant ? <AddVariant
                            setformData={setFormData}
                            category={selectedCategory.name}
                            setShowAddVariant={setShowAddVariant}
                        /> :
                            <button
                                type="submit"
                                onClick={() => setShowAddVariant(true)}
                                className="md:col-start-1 md:col-end-3 w-full py-1 border border-slate-700 rounded-md shadow-sm text-sm font-medium text-slate-800 hover:bg-slate-2s00 focus:outline-none focus:ring-2 focus:ring-offset-2"
                            >
                                Add new variant
                            </button>
                    }
                    <div className="flex justify-between md:col-start-1 md:col-end-3">
                        <button
                            type="submit"
                            className="w-full flex justify-evenly items-center py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? < ><Spinner /> Updating...</> : 'Update Product'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/products')}
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

export default EditProduct;