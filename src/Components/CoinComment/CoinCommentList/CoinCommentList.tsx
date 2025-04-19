import React from 'react'
import { CommentDetails } from '../../../Models/Comment'
import CoinCommentItem from '../CoinCommentItem/CoinCommentItem';

interface Props {
    comments: CommentDetails[];
};

const CoinCommentList = ({ comments }: Props) => {
    return (
        <>
            {comments
                ? comments.map((c) => <CoinCommentItem key={c.id} comment={c}/> )
                : ""
            }
        </>
    )
}

export default CoinCommentList