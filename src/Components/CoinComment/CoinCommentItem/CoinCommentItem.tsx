import React from 'react'
import { CommentDetails } from '../../../Models/Comment'


interface Props {
    comment: CommentDetails
};

const CoinCommentItem = ({ comment }: Props) => {
    return (
        <div className="relative grid grid-cols-1 gap-4 ml-4 p-4 mb-8 w-full border rounded-lg bg-white shadow-lg">
            <div className="relative flex gap-4">
                <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between">
                    <p className=" relative text-xl whitespace-nowrap truncate overflow-hidden">
                    {comment.title}
                    </p>
                    <p className=" relative text-xl whitespace-nowrap truncate overflow-hidden">
                    {comment.username}
                    </p>
                </div>
                <p className="text-dark text-sm">{comment.createdOn}</p>
                {comment.editedOn && <p className="text-dark text-sm">{comment.editedOn}</p>}
                </div>
            </div>
            <p className="-mt-4 text-gray-500">{comment.content}</p>
        </div>
    )
}

export default CoinCommentItem