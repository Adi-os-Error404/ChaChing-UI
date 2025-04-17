import axios from "axios";
import { UserProfileToken } from "../Models/User";

const API = "http://localhost:8080/api/";

export const loginAPI = async (username: string, password: string) => {
    try {
        const res = await axios.post<UserProfileToken>(API + "account/login", {
            username: username,
            password: password
        });
    }
    catch (err) {

    }
};

