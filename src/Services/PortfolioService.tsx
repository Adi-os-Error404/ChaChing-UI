import axios from "axios";

import { handleError } from "../Helpers/ErrorHandler";
import { PortfolioCoinDetails } from "../Models/Coins";


const API = "http://localhost:8080/api/portfolio";


export const addCoinToPort = async (coinId: string) => {
    try {
        const res = await axios.post(`${API}?coinId=${coinId}`);
        return res;
    } catch (err) {
        handleError(err);
    }
};

export const getCoinsInPort = async () => {
    try {
        const res = await axios.get<PortfolioCoinDetails[]>(API);
        return res;
    } catch (err) {
        handleError(err);
    }
}

export const deleteCoinFromPort = async (coinId: string) => {
    try {
        const res = await axios.delete(`${API}?coinId=${coinId}`);
        return res;
    } catch (err) {
        handleError(err);
    }
};