import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CointPage from "../Pages/CoinPage/CointPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage />},
            {path: "search", element: <SearchPage />},
            {path: "coin/:id", 
                element: <CointPage />,
                children: [

                ]
            },
        ]
    }
]);