import { createContext, use, useEffect, useState } from "react";
import { UserDetails, UserProfile } from "../Models/User";
import { useNavigate } from "react-router";
import { getUserDetailsAPI, loginAPI, registerAPI, updatePasswordAPI, updateUserFirstLastNameAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    userDetails: UserDetails | null;
    token: string | null;
    registerUser: (firstName: string, lastName: string, username: string, email: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
    getUserDetails: () => void;
    updateUserFirstLastName: (fName: string, lName: string) => void;
    updatePassword: (currentPassword: string, newPassword: string) => void;
}

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {

    const navigate = useNavigate();

    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [isReady, setIsReady] = useState<Boolean>(false);


    useEffect(() => {
        const userLs = localStorage.getItem("user");
        const tokenLs = localStorage.getItem("token");
        const tokenExpLs = localStorage.getItem("tokenExpiry");

        if (userLs && tokenLs && tokenExpLs) {
            const timeLeft = parseInt(tokenExpLs, 10) - Date.now();

                setUser(JSON.parse(userLs));
                setToken(tokenLs);
                axios.defaults.headers.common["Authorization"] = `Bearer ${tokenLs}`;
                const logoutTimer = setTimeout(() => {
                    logout();
                    toast.info("Session expired. Please log in again.");
                },  timeLeft);
        }
        setIsReady(true);
    }, []);

    const registerUser = async (
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        password: string
    ) => {
        await registerAPI(firstName, lastName, username, email, password)
        .then((res) => {
            if (res) {
                const userObj = {
                    username: res?.data.username
                };
                setUser(userObj!);
                toast.success("Registration Successful!");
                logout();
                navigate("/login");
            }
        })
        .catch(() => toast.warning("Server error occured"));
    }

    const loginUser = async (
        username: string,
        password: string
    ) => {
        await loginAPI(username, password)
        .then((res) => {
            if (res) {
                const { token, username, tokenExpiry } = res?.data;
                const userObj = { username: username };
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(userObj));
                localStorage.setItem("tokenExpiry", tokenExpiry.toString());
                setToken(res?.data.token!);
                setUser(userObj!);
                toast.success("Login Successful!");
                navigate("/search");
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
        })
        .catch(() => toast.warning("Server error occured"));
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("tokenExpiry");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
        setToken("");
        navigate("/");
    }

    const isLoggedIn = () => !!user;

    const getUserDetails = async () => {
        await getUserDetailsAPI()
        .then((res) => {
            if (res) {
                const userData = res?.data;
                setUserDetails(userData);
            }
        })
        .catch(() => toast.warning("Server error occured"));
    }

    const updateUserFirstLastName = async (fName: string, lName: string) => {
        try {
            const response = await updateUserFirstLastNameAPI(fName, lName);
            if (response) {
                getUserDetails();
                toast.success("User name updated successfully");
            }
        } catch (error) {
            toast.error("Failed to update user name");
        }
    };

    const updatePassword = async (currentPassword: string, newPassword: string) => {
        try {
            const response = await updatePasswordAPI(currentPassword, newPassword);
            if (response) {
                toast.success("Password updated successfully");
            }
        } catch (error) {
            toast.error("Failed to update password");
        }
    };

    return (
        <UserContext.Provider value={{ user, token, registerUser, loginUser, logout, isLoggedIn, getUserDetails, userDetails, updateUserFirstLastName, updatePassword }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};


export const useAuth = () => React.useContext(UserContext);
