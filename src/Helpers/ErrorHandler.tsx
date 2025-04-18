import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
        const err = error.response;
        if (err?.data) {
            if (err?.status === 401) {
                toast.warning(err.data.message || "Unauthorized access. Please check your credentials.");
            } else if (err?.status === 400) {
                toast.warning(err.data.message || "Bad Request. Please check your input.");
            } else {
                toast.warning(err.data.message || "An unknown error occurred");
            }
        } else {
            toast.warning("An error occurred with no response data.");
        }
    } else {
        toast.warning("Non-Axios error occurred");
    }
};
