import { toast } from "react-toastify";

export const notifyError = (error) => toast.error(error);
export const notifySuccess = (message) => toast.success(message);
