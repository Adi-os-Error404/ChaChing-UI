import React, { useState } from 'react'
import CoinCommentForm from './CoinCommentForm/CoinCommentForm'
import { CommentFormInputs } from '../../../coin'
import { addCommentAPI, getCommentsAPI } from '../../Services/CommentService';
import { toast } from 'react-toastify';
import { CommentDetails } from '../../Models/Comment';
import CoinCommentList from './CoinCommentList/CoinCommentList';


interface Props {
    coinId: string;
    comments: CommentDetails[];
};

const CoinComment = ({ coinId, comments }: Props) => {

    const [newComments, setNewComments] = useState<CommentDetails[]>(comments);

    const getComments = () => {
        getCommentsAPI(coinId)
        .then((res) => {
            if (res) {
                setNewComments(res.data);
            }
        })
        .catch((e) => {
            toast.warning(e);
        })
    };

    const handleComment = (e: CommentFormInputs) => 
        addCommentAPI(coinId, e.title, e.content)
        .then((res) => {
            if (res) {
                toast.success("Comment posted!");
                getComments();
            }
        })
        .catch((e) => {
            toast.warning(e);
    });
    

    return (
        <>
            <CoinCommentForm coinId={coinId} handleComment={handleComment} />
            <CoinCommentList comments={newComments} />
        </>
    )
}

export default CoinComment