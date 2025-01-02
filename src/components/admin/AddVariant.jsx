import React, { useState } from 'react';

// Standard Sizes
const standardSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"];

// Numeric Sizes
const numericSizes = ["30", "31", "32", "33", "33/34", "34", "36", "38", "38/34", "40", "40", "40/34", "41", "42", "42/34", "44", "44/34", "46", "48", "50"];

// Custom Formats
const customFormats = ["L/XL", "33/34", "33W x 32L", "38W x 34L", "40W x 34L", "42W x 34L", "44W x 34L"];

// European Sizes
const europeanSizes = ["EU 32", "EU 36", "EU 38", "EU 38 1/2", "EU L", "EU M", "EU S", "EU XS"];

// French Sizes
const frenchSizes = ["FR 42"];


const AddVariant = ({ setformData, setShowAddVariant }) => {
    const [variant, setVariant] = useState({
        color: "",
        size: "",
        price: 0,
        stock: 0,
    });
    const [customSize, setCustomSize] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVariant({ ...variant, [name]: value })
        if (name === 'size') {
            setCustomSize('');
        }
    }

    const handleCustomSizeChange = (e) => {
        setCustomSize(e.target.value);
        setVariant({ ...variant, size: e.target.value })
    }

    const addVariant = () => {
        console.log(variant)
        setformData(prev => {
            return { ...prev, variants: [variant, ...prev.variants] }
        })
        setShowAddVariant(false)
    }
    return (
        <div className="w-full mx-auto p-4 pt-0 bg-white rounded-lg shadow-md md:col-start-1 md:col-end-3">
            <h2 className="text-md font-bold text-center">New Variant</h2>
            <div className="grid gap-x-2 md:grid-cols-2">
                <div>
                    <input
                        type="text"
                        name="color"
                        id="color"
                        value={variant.color}
                        placeholder='Color'
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <select
                        name="size"
                        id="size"
                        value={variant.size}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select size</option>
                        <optgroup label="Standard Sizes">
                            {standardSizes.map((size, index) => (
                                <option key={`standard-${index}`} value={size}>{size}</option>
                            ))}
                        </optgroup>
                        <optgroup label="Numeric Sizes">
                            {numericSizes.map((size, index) => (
                                <option key={`numeric-${index}`} value={size}>{size}</option>
                            ))}
                        </optgroup>
                        <optgroup label="Custom Formats">
                            {customFormats.map((size, index) => (
                                <option key={`custom-${index}`} value={size}>{size}</option>
                            ))}
                        </optgroup>
                        <optgroup label="European Sizes">
                            {europeanSizes.map((size, index) => (
                                <option key={`european-${index}`} value={size}>{size}</option>
                            ))}
                        </optgroup>
                        <optgroup label="French Sizes">
                            {frenchSizes.map((size, index) => (
                                <option key={`french-${index}`} value={size}>{size}</option>
                            ))}
                        </optgroup>
                    </select>
                    <input
                        type="text"
                        name="customSize"
                        id="customSize"
                        value={customSize}
                        placeholder='Custom Size'
                        onChange={handleCustomSizeChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className='mt-1'>
                    <label className='text-sm'>Price:</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        step={0.01}
                        min={0}
                        value={variant.price}
                        placeholder='Price'
                        onChange={handleChange}
                        className="mt-0 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className='mt-1'>
                    <label className='text-sm'>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        id="stock"
                        value={variant.stock}
                        placeholder='Stock'
                        onChange={handleChange}
                        className="mt-0 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="flex gap-x-1 justify-between w-full col-start-1 col-end-3 mt-2">
                    <button
                        type="button"
                        onClick={addVariant}
                        className="w-full py-1 border border-slate-700 rounded-md shadow-sm text-sm font-medium text-slate-800"
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowAddVariant(false)}
                        className="w-full py-1 border border-red-500 rounded-md shadow-sm text-sm font-medium text-red-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddVariant