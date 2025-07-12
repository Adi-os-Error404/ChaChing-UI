import React from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../Context/useAuth';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import coins_bg from "../../Assets/coins_bg.png"
import coins_bg2 from "../../Assets/coins_bg2.png"



type LoginFormsInputs = {
    username: string;
    password: string;
}

const validation = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
});

const LoginPage = () => {

    const { loginUser } = useAuth();
    const {
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) })
    
    const handleLogin = (form: LoginFormsInputs) => {
        loginUser(form.username, form.password);
    }

    return (
        <>
          <section className='flex items-center justify-center h-[calc(100vh-8rem)]'>
          <div className="absolute top-4 -left-0 md:top-24 md:-left-10 z-0">
            <img src={coins_bg2} alt="Crypto Coins" className="w-[500px] h-auto object-contain pointer-events-none select-none" />
          </div>
          <div className="absolute -bottom-30 -left-20 md:left-250 md:-bottom-10 md:-right-10 z-0">
            <img src={coins_bg} alt="Crypto Coins" className="w-[500px] h-auto object-contain pointer-events-none select-none" />
          </div>
            <div className='w-120 mx-8 px-8 pt-6 pb-8 md:px-14 md:py-10 bg-white rounded-lg shadow-2xl z-10'>
              <h1 className='font-semibold text-3xl text-start mt-4 mb-10'>
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLogin)}>

                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-left"
                  ></label>
                  <input
                    type="text"
                    id="username"
                    className='w-full h-12 bg-stone-100 font-semibold rounded-lg px-6 border-solid border-black border-4' 
                    placeholder="Username"
                    {...register("username")}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.target.value = e.target.value.toLowerCase();
                    }}
                  />
                  {errors.username ? <p className='m-2.5 text-rose-500'>{errors.username.message}</p> : "" }
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className='w-full h-12 bg-stone-100 font-semibold rounded-lg px-6 border-solid border-black border-4' 
                    {...register("password")}
                  />
                  {errors.password ? <p className='m-2.5 text-rose-500'>{errors.password.message}</p> : "" }
                </div>

                <button
                  type="submit"
                  className='rounded-lg w-full p-2.5 mt-4 text-white bg-green-400 font-bold text-lg'>
                  Login
                </button>
                <p className="text-sm font-light text-gray-600">
                  Don’t have an account yet?{" "}
                  <Link to={'/register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Sign up
                  </Link>
                </p>

              </form>
            </div>
          </section>
        </>
    )
}

export default LoginPage