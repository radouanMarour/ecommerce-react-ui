import React, { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, fetchCart, updateCartItem } from '../api/cartApi';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { items, total, loading } = useSelector(state => state.cart)
    const { token } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchCart(token))
    }, [dispatch])

    const handleDelete = (itemId) => {
        dispatch(deleteCartItem({ token, itemId }))
    }

    const updateQuantity = (itemId, quantity) => {
        dispatch(updateCartItem({ token, itemId, body: { quantity } }))
    }
    const handleCheckout = () => {
        navigate('/checkout/shipping')
    }

    if (loading) {
        return <Loader />
    }
    if (items.length === 0) {
        return <h1 className='text-center'>Your cat is empty</h1>
    }

    return (
        <div className="container mx-auto p-4 pt-20">
            <h2 className="text-2xl text-center md:text-left font-semibold mb-4">Panel ({items?.length})</h2>

            <div className="flex flex-col md:flex-row gap-4">
                {/* Cart Items */}
                <div className="w-full md:w-3/5 bg-white rounded-md shadow-md p-4">
                    {items && items?.map(item => {
                        const itemsInStock = item?.product?.variants?.find(
                            variant => variant.color === item.color && variant.size === item.size
                        )?.stock
                        return (
                            <div key={item._id} className="flex flex-col justify-between border-b pb-3 mb-3">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <img src={item?.product?.images?.[0]} alt={item?.product?.name} className="w-16 h-16 rounded-md object-contain" />
                                        <div>
                                            <h3 className="font-medium">{item?.product?.name}</h3>
                                            <div className="text-gray-600 text-xs">
                                                Color: <span className="font-semibold">{item.color}</span> |
                                                Size: <span className="font-semibold">{item.size}</span>
                                            </div>
                                            <div className="text-red-600 text-sm">
                                                {itemsInStock <= item.quantity && `Only ${itemsInStock} left in stock`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xl font-bold">
                                        ${item.price}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        className="text-red-500 hover:text-red-700 mt-2 self-end"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        <DeleteIcon className='mr-1' /> Delete
                                    </button>
                                    <div className="flex items-center justify-end gap-1 mt-2">
                                        <button
                                            className="bg-blue-500 rounded-md p-1 hover:bg-blue-700 disabled:opacity-50"
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            disabled={item.quantity === 1}
                                        >
                                            <RemoveIcon className='text-white' />
                                        </button>
                                        <span className='border px-2'>{item.quantity}</span>
                                        <button
                                            className="bg-blue-500 rounded-md p-1 hover:bg-blue-700 disabled:opacity-50"
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            disabled={item.quantity === itemsInStock}
                                        >
                                            <AddIcon className='text-white' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Order Summary */}
                <aside className="w-full md:w-2/5 bg-gray-50 rounded-md shadow-md p-4">
                    <h3 className="text-xl font-semibold mb-4">PANEL RESUME</h3>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Sub-total</span>
                        <span className="text-gray-700 font-semibold">${total}</span>
                    </div>
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full"
                        onClick={handleCheckout}
                    >
                        Proceed to checkout
                    </button>
                </aside>
            </div>
        </div>
    );
};

export default CartPage;