import React, { useState } from 'react'
import CoinCommentForm from './CoinCommentForm/CoinCommentForm'
import { addCommentAPI, deleteCommentAPI, editCommentAPI, getCommentsAPI } from '../../Services/CommentService';
import { toast } from 'react-toastify';
import { CommentDetails, CommentFormInputs } from '../../Models/Comment';
import CoinCommentList from './CoinCommentList/CoinCommentList';
import { UserProfile } from '../../Models/User';


interface Props {
    coinId: string;
    comments: CommentDetails[];
    user: UserProfile;
};

const CoinComment = ({ coinId, comments, user }: Props) => {

    const [newComments, setNewComments] = useState<CommentDetails[]>(comments);
    const [editingId, setEditingId] = useState<number | null>(null);

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

    const postComment = (e: CommentFormInputs) => 
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

    const handleStartEdit = (id: number) => setEditingId(id);
    const handleCancelEdit = () => setEditingId(null);

    const handleEditSubmit = async (id: number, data: CommentFormInputs) => {
        try {
            const res = await editCommentAPI(id, data.title, data.content);
            if (res) {
                toast.success("Comment updated!");
                getComments();
                setEditingId(null);
            }
        } catch (err) {
            toast.error("Failed to update comment");
        }
    };


    const deleteComment = async (id: number) => {
        try {
            const res = await deleteCommentAPI(id);
            if (res) {
                toast.success("Comment deleted!");
                setNewComments(newComments.filter(comment => comment.id !== id));
            }
        } catch (err) {
            toast.error("Failed to delete comment");
        }
    };
    

    return (
        <>
            <CoinCommentForm coinId={coinId} postComment={postComment} />
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 h-[70vh] overflow-x-scroll">
            <CoinCommentList 
                comments={newComments} 
                user={user} 
                editingId={editingId}
                onStartEdit={handleStartEdit}
                onCancelEdit={handleCancelEdit}
                onSubmitEdit={handleEditSubmit}
                onDelete={deleteComment}
            />
            </div>

        </>
    )
}

export default CoinComment