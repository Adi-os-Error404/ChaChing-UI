import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/useAuth'

type Props = {}

const Navbar = (props: Props) => {

    const { isLoggedIn, user, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 z-50 w-full h-34 bg-stone-100 shadow-lg items-center pr-12">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-20">
                    <Link to="/">
                        <img className="h-full pt-3 ml-12 w-50" src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="font-bold pt-3 gap-x-4 flex items-center">
                    {
                        isLoggedIn() ? (
                            <>
                                <p className='text-2xl'>
                                    Welcome {user?.username},
                                </p>
                                <Link to="/search" className="text-black hover:text-darkBlue">
                                    <button className='bg-green-400 text-white font-bold w-30 py-2 px-4 text-lg'>Search</button>
                                </Link>
                                <Link to="/profile" className="text-black hover:text-darkBlue">
                                    <button className='bg-blue-400 text-white font-bold w-30 py-2 px-4 text-lg'>Profile</button>
                                </Link>
                                <Link to="/" className="text-black hover:text-darkBlue">
                                    <button onClick={logout} className='bg-rose-400 text-white font-bold w-30 py-2 px-4 text-lg'>Logout</button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-black hover:text-darkBlue">
                                    <button className='bg-green-400 text-white font-bold w-30 py-2 px-4 text-lg'>Sign In</button>
                                </Link>
                                <Link to="/register" className="text-black hover:text-darkBlue">
                                    <button className='bg-blue-400 text-white font-bold w-30 py-2 px-4 text-lg'>Sign Up</button>
                                </Link>
                            </>
                        )
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar