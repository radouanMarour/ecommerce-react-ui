// Helper functions for localStorage
export const loadAuthFromLocalStorage = () => {
    try {
        const serializedAuth = localStorage.getItem('auth');
        return serializedAuth ? JSON.parse(serializedAuth) : { isAuthenticated: false, user: null, token: null };
    } catch (err) {
        console.error('Failed to load auth state from localStorage', err);
        return { isAuthenticated: false, user: null, token: null };
    }
};

export const saveAuthToLocalStorage = (state) => {
    try {
        const serializedAuth = JSON.stringify(state);
        localStorage.setItem('auth', serializedAuth);
    } catch (err) {
        console.error('Failed to save auth state to localStorage', err);
    }
};

export const clearAuthFromLocalStorage = () => {
    try {
        localStorage.removeItem('auth');
    } catch (err) {
        console.error('Failed to clear auth state from localStorage', err);
    }
};