//categorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [
        { id: 1, name: "Development", url: "/development" },
        { id: 2, name: "Bussiness", url: "/bussiness" },
        { id: 3, name: "IT & Software", url: "/it-software" }
    ]
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    }
});

export default categorySlice.reducer;