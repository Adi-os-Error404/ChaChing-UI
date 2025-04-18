import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CointPage from "../Pages/CoinPage/CointPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage />},
            {path: "register", element: <RegisterPage />},
            {path: "login", element: <LoginPage />},
            {path: "search", element: <ProtectedRoute> <SearchPage /> </ProtectedRoute>},
            {path: "coin/:id", 
                element: <ProtectedRoute> <CointPage /> </ProtectedRoute>,
                children: [
                ]
            },
        ]
    }
]);