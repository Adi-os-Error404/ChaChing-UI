import axios from "axios";

import { handleError } from "../Helpers/ErrorHandler";
import { ArbitrageDetails } from "../Models/Arbitrage";

const API = "http://localhost:8080/api/arbitrage";


export const detectArbitrageFromPort = async (profitMargin: number) => {
    try {
        const res = await axios.get<ArbitrageDetails[]>(API, {
            params: { profitMargin }
        });
        return res.data;
    } catch (err) {
        handleError(err);
    }
};