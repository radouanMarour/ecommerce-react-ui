import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductReview } from '../api/productApi';
import { notifyError, notifySuccess } from '../utils/notifications';
import { Star } from '@mui/icons-material';

const AddReviewForm = ({ productId }) => {
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        rating: 0,
        comment: '',
    });
    const [hover, setHover] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.rating === 0) {
            notifyError('Please select a rating');
            return;
        }
        try {
            await dispatch(addProductReview({
                productId,
                reviewData: formData,
                token
            })).unwrap();
            notifySuccess('Review added successfully');
            setFormData({ rating: 0, comment: '' });
        } catch (error) {
            console.log(error)
            notifyError(error.message || 'Failed to add review');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Star Rating */}
                <div className="flex items-center mb-4">
                    {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label key={index} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="rating"
                                    className="hidden"
                                    value={ratingValue}
                                    onClick={() => setFormData({
                                        ...formData,
                                        rating: ratingValue
                                    })}
                                />
                                <Star
                                    className={`h-6 w-6 text-${ratingValue <= (hover || formData.rating) ? "yellow" : "gray"}-400`}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        );
                    })}
                </div>

                {/* Review Comment */}
                <div>
                    <textarea
                        id="comment"
                        rows="4"
                        value={formData.comment}
                        onChange={(e) => setFormData({
                            ...formData,
                            comment: e.target.value
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                        placeholder='Your Review'
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default AddReviewForm;