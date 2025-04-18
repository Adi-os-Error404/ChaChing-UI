import axios from "axios";
import { UserDetails, UserProfile, UserProfileToken } from "../Models/User";
import { handleError } from "../Helpers/ErrorHandler";


const API = "http://localhost:8080/api/account";

export const loginAPI = async (username: string, password: string) => {
    try {
        const res = await axios.post<UserProfileToken>(API + "/login", {
            username: username,
            password: password
        });
        return res;
    } catch (err) {
        handleError(err);
    }
};

export const registerAPI = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
) => {
    try {
        const res = await axios.post<UserProfile>(API + "/register", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        });
        return res;
    } catch (err) {
        handleError(err);
    }
};

export const getUserDetailsAPI = async () => {
    try {
        return await axios.get<UserDetails>(API);
    } catch (err) {
        handleError(err);
    }
}

export const updateUserFirstLastNameAPI = async (
    firstName: string,
    lastName: string
) => {
    try {
        const res = await axios.put<UserDetails>(API + "/name", {
            firstName: firstName,
            lastName: lastName,
        });
        return res;
    } catch (err) {
        handleError(err);
    }
}


export const updatePasswordAPI = async (
    currentPassword: string,
    newPassword: string
) => {
    try {
        const res = await axios.put<UserDetails>(API + "/password", {
            currentPassword: currentPassword,
            newPassword: newPassword,
        });
        return res;
    } catch (err) {
        handleError(err);
    }
}







