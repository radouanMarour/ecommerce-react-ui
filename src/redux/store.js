import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import headerReducer from './slices/headerSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        header: headerReducer
    }
});

export default store;