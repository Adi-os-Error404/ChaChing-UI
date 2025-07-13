import axios from 'axios';
import { CoinSearch, MarketChartPoint } from "./coin"

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

export const fetchTrendingCoins = async (): Promise<SearchRes["coins"] | string> => {
    try {
        const res = await axios.get<{ coins: { item: SearchRes["coins"][number] }[] }>(
        "https://api.coingecko.com/api/v3/search/trending"
        );
        // Map from trending format { item: Coin }[] to just Coin[]
        const trendingCoins = res.data.coins.map(c => c.item);
        return trendingCoins;
    } catch (err) {
        if (axios.isAxiosError(err)) {
        console.log("Error fetching trending coins: ", err.message);
        return err.message;
        } else {
        console.log("Unexpected error: ", err);
        return "An unexpected error has occurred";
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