import React from 'react'
import { CommentDetails, CommentFormInputs } from '../../../Models/Comment'
import { UserProfile } from '../../../Models/User';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';

interface Props {
    comment: CommentDetails;
    user: UserProfile;
    isEditing: boolean;
    onStartEdit: (id: number) => void;
    onCancelEdit: () => void;
    onSubmitEdit: (id: number, data: CommentFormInputs) => void;
    onDelete: (id: number) => void;
};

const validation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
});

function getDaysAgo(utcString: string): string {
    const givenDate = new Date(utcString);
    const now = new Date();
    const diffInTime = now.getTime() - givenDate.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
}


const CoinCommentItem = ({ comment, user, isEditing, onStartEdit, onCancelEdit, onSubmitEdit, onDelete }: Props) => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CommentFormInputs>({
        resolver: yupResolver(validation),
        defaultValues: {
            title: comment.title,
            content: comment.content,
        }
    });

    const isAuthor = user.username === comment.username;

    return (
        <div className="p-2 my-8 w-full border-solid border-black border-4 rounded-lg bg-white shadow-lg">
            {isEditing ? (
                <form className='p-2 space-y-4' onSubmit={handleSubmit((data) => onSubmitEdit(comment.id, data))}>
                    <input
                        type="text"
                        className="w-full h-12 bg-stone-100 rounded-lg font-semibold border-solid px-6  border-black border-4"
                        {...register("title")}
                        placeholder="Edit title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                    <textarea
                        className="w-full py-2 bg-stone-100 rounded-lg font-semibold border-solid px-6  border-black border-4"
                        rows={3}
                        {...register("content")}
                        placeholder="Edit content"
                    ></textarea>
                    {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

                    <div className="flex justify-end space-x-2.5">
                        <button type="submit" className="bg-green-400 font-bold text-sm size-10 p-1.5 rounded-xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                        </button>
                        <button type="button" className="bg-rose-400 font-bold text-sm size-10 p-1.5 rounded-xl flex justify-center items-center" onClick={onCancelEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div>
                        <div className='flex justify-between items-center'>
                            <p className="text-sm text-gray-600 text-left font-bold">@{comment.username}</p>
                            <p className="text-sm text-gray-600">
                                {comment.editedOn ? `${getDaysAgo(comment.editedOn)} (edited)` : getDaysAgo(comment.createdOn)}
                            </p>
                        </div>
                        <h3 className="ml-2 mt-1 text-2xl font-semibold text-gray-800 text-left">{comment.title}</h3>
                    </div>
                    <p className="mx-2 text-left">{comment.content}</p>
                    {isAuthor && (
                        <div className='flex justify-end m-1 space-x-2.5'>
                            <button className="bg-blue-400 font-bold text-sm size-10 p-1.5 rounded-xl flex justify-center items-center" onClick={() => onStartEdit(comment.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                            </button>
                            <button className="bg-rose-400 font-bold text-sm size-10 p-2 rounded-xl flex justify-center items-center" onClick={() => onDelete(comment.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                            </button>
                        </div>

                    )}
                </>
            )}
        </div>
    );
}

export default CoinCommentItem