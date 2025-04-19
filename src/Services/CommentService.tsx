import axios from "axios";

import { handleError } from "../Helpers/ErrorHandler";
import { CommentDetails, CommentPost } from "../Models/Comment";


const API = "http://localhost:8080/api/comments/";


export const getCommentsAPI = async (coindId: string) => {
    try {
        const res = await axios.get<CommentDetails[]>(API + coindId);
        return res;
    } catch (err) {
        handleError(err);
    }
}

export const addCommentAPI = async (
    coindId: string, 
    title: string, 
    content: string
) => {
    try {
        const res = await axios.post<CommentPost>(API + coindId, {
            title: title,
            content: content
        });
        return res;
    } catch (err) {
        handleError(err);
    }
}