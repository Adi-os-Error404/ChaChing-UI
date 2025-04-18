import { createContext, use, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (firstName: string, lastName: string, username: string, email: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {

    const navigate = useNavigate();

    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
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
            }
        })
        .catch(() => toast.warning("Server error occured"));
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("tokenExpiry");
        setUser(null);
        setToken("");
        navigate("/");
    }

    const isLoggedIn = () => !!user;

    return (
        <UserContext.Provider value={{ user, token, registerUser, loginUser, logout, isLoggedIn }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};


export const useAuth = () => React.useContext(UserContext);
