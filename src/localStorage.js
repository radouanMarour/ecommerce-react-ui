export const saveToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const removeFromLocalStorage = (key) => localStorage.removeItem(key);

export const getFromLocalStorage = (key) => {
    const value = localStorage.getItem(key)
    if (value && value.startsWith("{")) {
        return JSON.parse(value)
    } else {
        return value
    }
};
