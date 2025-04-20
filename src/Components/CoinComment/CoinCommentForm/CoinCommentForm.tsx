import React from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { CommentFormInputs } from '../../../Models/Comment'

interface Props {
    coinId: string;
    postComment: (e: CommentFormInputs) => void;
};

const validation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required")
});

const CoinCommentForm = ({ coinId, postComment }: Props) => {

    const {
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<CommentFormInputs>({ resolver: yupResolver(validation) })


    return (
        
    <form className="bg-white rounded-2xl shadow-lg p-8 space-y-4" onSubmit={handleSubmit(postComment)}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-left">✏️ Post a comment</h2>
        <div>
        <input
            type="text"
            id="title"
            className="w-full h-12 bg-stone-100 rounded-lg font-semibold border-solid px-6  border-black border-4"
            placeholder="Title"
            {...register("title")}
        />
        {errors.title ? <p className='m-2.5 text-rose-500'>{errors.title.message}</p> : ""}
        </div>
        <div>
            <label htmlFor="comment" className="sr-only">
            Your comment
            </label>
            <textarea
            id="comment"
            rows={3}
            className="w-full py-2 bg-stone-100 rounded-lg font-semibold border-solid px-6  border-black border-4"
            placeholder="Write a comment..."
            {...register("content")}
            ></textarea>
            {errors.content ? <p className='m-2.5 text-rose-500'>{errors.content.message}</p> : ""}
        </div>
        <div className="flex justify-end">
            <button
                type="submit"
                className="px-4 py-2 mt-2 bg-green-400 text-white font-bold rounded-lg"
            >
                Post comment
            </button>
        </div>
        </form>
    )
}

export default CoinCommentForm