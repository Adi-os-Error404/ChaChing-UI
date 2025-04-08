import axios from 'axios';
import { CoinDetails, CoinSearch, MarketChartPoint } from "./coin"
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

export const getCoinMarketChart = async (coinId: string, vsCurrency: string, days: string) => {
    try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
            params: {
                vs_currency: vsCurrency,
                days,
                interval: "daily",
            },
        });

        const chartData: MarketChartPoint[] = res.data.prices.map((point: [number, number]) => ({
            timestamp: point[0],
            price: point[1],
        }));

        return chartData;

    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.log("Error:", err.message);
            return err.message;
        } else {
            console.log("Unexpected Error:", err);
            return "An unexpected error occurred";
        }
    }
};