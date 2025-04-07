import axios from 'axios';
import { CoinDetails, CoinSearch } from "./coin"
import { error } from "jquery";

interface SearchRes {
    coins: CoinSearch[]
}

export const searchCoins = async (query: string) => {
    try {
        const res = await axios.get<SearchRes>(`https://api.coingecko.com/api/v3/search?query=${query}`);
        return res.data.coins;
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            console.log("Error: ", err.message)
            return err.message;
        }
        else {
            console.log("Unexpected Error: ", err);
            return "An enexpected error has occured"
        }
    }
}

export const getCoinDetails = async (id: string) => {
    try {
        const res = await axios.get<CoinDetails>(`https://api.coingecko.com/api/v3/coins/${id}`);
        return res.data;

    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.log("Error: ", err.message);
            return null;
        } 
        else {
            console.log("Unexpected Error: ", err);
            return null;
        }
    }
};