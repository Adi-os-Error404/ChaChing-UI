import axios from "axios";

import { handleError } from "../Helpers/ErrorHandler";
import { CoinFullDetails } from "../Models/Coins";


const API = "http://localhost:8080/api/coins/";



export const getCoinFullDetails = async (coindId: string) => {
    try {
        const res = await axios.get<CoinFullDetails>(API + coindId);
        return res;
    } catch (err) {
        handleError(err);
    }
}
