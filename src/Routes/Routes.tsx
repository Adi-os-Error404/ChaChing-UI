import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CoinPage from "../Pages/CoinPage/CoinPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import PortfolioPage from "../Pages/PortfolioPage/PortfolioPage";
import ArbitragePage from "../Pages/ArbitragePage/ArbitragePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage />},
            {path: "register", element: <RegisterPage />},
            {path: "login", element: <LoginPage />},
            {path: "profile", element: <ProtectedRoute> <ProfilePage /> </ProtectedRoute>},
            {path: "search", element: <ProtectedRoute> <SearchPage /> </ProtectedRoute>},
            {path: "portfolio", element: <ProtectedRoute> <PortfolioPage /> </ProtectedRoute>},
            {path: "arbitrage", element: <ProtectedRoute> <ArbitragePage /> </ProtectedRoute>},
            {path: "coin/:id", 
                element: <ProtectedRoute> <CoinPage /> </ProtectedRoute>,
                children: [
                ]
            },
        ]
    }
]);