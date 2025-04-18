import { createContext, useEffect, useState } from "react";
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
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
                localStorage.setItem("token", res?.data.token);
                const userObj = {
                    username: res?.data.username
                };
                localStorage.setItem("user", JSON.stringify(userObj));
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
