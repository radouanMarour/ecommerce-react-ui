import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartCount: 0,
    isMobileMenuOpen: false,
};

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setCartCount: (state, action) => {
            state.cartCount = action.payload;
        },
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        closeMobileMenu: (state) => {
            state.isMobileMenuOpen = false;
        },
    },
});

export const { setCartCount, toggleMobileMenu, closeMobileMenu } = headerSlice.actions;
export default headerSlice.reducer;