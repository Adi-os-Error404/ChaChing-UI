import React from 'react'
import { CommentDetails, CommentFormInputs } from '../../../Models/Comment'
import CoinCommentItem from '../CoinCommentItem/CoinCommentItem';
import { UserProfile } from '../../../Models/User';

interface Props {
    comments: CommentDetails[];
    user: UserProfile;
    editingId: number | null;
    onStartEdit: (id: number) => void;
    onCancelEdit: () => void;
    onSubmitEdit: (id: number, data: CommentFormInputs) => void;
    onDelete: (id: number) => void;
};

const CoinCommentList = ({ comments, user, editingId, onStartEdit, onCancelEdit, onSubmitEdit, onDelete }: Props) => {
    return (
        <>
            {comments
                ? comments.map((c) => 
                    <CoinCommentItem 
                        key={c.id} 
                        comment={c} 
                        user={user}
                        isEditing={editingId === c.id}
                        onStartEdit={onStartEdit}
                        onCancelEdit={onCancelEdit}
                        onSubmitEdit={onSubmitEdit}
                        onDelete={onDelete}
                    /> )
                : ""
            }
        </>
    )
}

export default CoinCommentList