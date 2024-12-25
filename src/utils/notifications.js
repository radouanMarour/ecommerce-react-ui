import { toast, Slide } from "react-toastify";

const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Slide,
};

export const notifyError = (error) => toast.error(error, toastOptions);
export const notifySuccess = (message) => toast.success(message, toastOptions);
