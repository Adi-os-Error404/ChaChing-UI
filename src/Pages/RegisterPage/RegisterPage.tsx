import React from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../Context/useAuth';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';




type RegisterFormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}

const validation = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
});


const RegisterPage = () => {

    const { registerUser } = useAuth();
    const {
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<RegisterFormInputs>({ resolver: yupResolver(validation) })
    
    const handleSignup = (form: RegisterFormInputs) => {
        registerUser(form.firstName, form.lastName, form.username, form.email, form.password);
    }

    return (
        <>
        <section className='flex items-center justify-center h-[calc(100vh-8rem)]'>
            <div className='w-150 px-14 py-10 bg-white rounded-lg shadow-2xl'>
            <h1 className='font-semibold text-3xl text-start mt-4 mb-12'>
                Register your account
            </h1>

            <form className="space-y-6" onSubmit={handleSubmit(handleSignup)}>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                <input
                    type="text"
                    id="firstName"
                    className='w-full h-12 bg-stone-100 font-semibold rounded-lg px-6 border-solid border-black border-4' 
                    placeholder="First Name"
                    {...register("firstName")}
                />
                {errors.firstName && <p className='m-2.5 text-rose-500'>{errors.firstName.message}</p>}
                </div>

                <div className="w-full">
                <input
                    type="text"
                    id="lastName"
                    className='w-full h-12 bg-stone-100 font-semibold rounded-lg px-6 border-solid border-black border-4' 
                    placeholder="Last Name"
                    {...register("lastName")}
                />
                {errors.lastName && <p className='m-2.5 text-rose-500'>{errors.lastName.message}</p>}
                </div>
            </div>
            <div>
                <input
                type="email"
                id="email"
                placeholder="Email"
                className='w-full h-12 bg-stone-100 font-semibold rounded-lg px-6 border-solid border-black border-4' 
                {...register("email")}
                />
                {errors.email && <p className='m-2.5 text-rose-500'>{errors.email.message}</p>}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                <input
                    type="text"
                    id="username"
                    className='w-full h-12 bg-stone-100 font-semibold rounded-lg px-6 border-solid border-black border-4' 
                    placeholder="Username"
                    {...register("username")}
                />
                {errors.username && <p className='m-2.5 text-rose-500'>{errors.username.message}</p>}
                </div>

                <div className="w-full">
                <input
                    type="password"
                    id="password"
                    className='w-full h-12 bg-stone-100 font-semibold rounded-lg px-6 border-solid border-black border-4' 
                    placeholder="Password"
                    {...register("password")}
                />
                {errors.password && <p className='m-2.5 text-rose-500'>{errors.password.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                className='rounded-lg w-full p-2.5 mt-4 text-white bg-green-400 font-bold text-lg'>
                Register
            </button>
            
            <p className="text-sm font-light text-gray-600">
                Already have an account?{" "}
                <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Sign in
                </Link>
            </p>
            </form>
            </div>
        </section>
        </>
    )
}

export default RegisterPage