import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';

type Props = {};

const Navbar = (props: Props) => {
    const { isLoggedIn, user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 z-50 w-full h-28 sm:h-34 bg-stone-100 shadow-lg items-center pr-12">
            <div className="flex items-center justify-between w-full px-4 sm:px-0">
                <div className="flex pt-4 items-center sm:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-white bg-blue-400 p-0.5 focus:outline-none">
                    {menuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    )}
                </button>
                </div>

                <div className="flex-grow flex justify-center sm:justify-start">
                <Link to="/">
                    <img
                    src={logo}
                    alt="logo"
                    className="h-26 sm:h-full pt-4 sm:pt-3 sm:ml-12 w-auto sm:w-50"
                    />
                </Link>
                </div>

                <div className="font-bold pt-3 gap-x-4 flex items-center hidden sm:flex">
                {isLoggedIn() ? (
                    <>
                    <p className="text-2xl">Welcome {user?.username}!</p>
                    <Link to="/search" className="text-black hover:text-darkBlue">
                        <button className="bg-green-400 text-white font-bold w-30 py-2 px-4 text-lg">Search</button>
                    </Link>
                    <Link to="/portfolio" className="text-black hover:text-darkBlue">
                        <button className="bg-amber-400 text-white font-bold w-30 py-2 px-4 text-lg">Portfolio</button>
                    </Link>
                    <Link to="/arbitrage" className="text-black hover:text-darkBlue">
                        <button className="bg-purple-400 text-white font-bold w-30 py-2 px-4 text-lg">Arbitrage</button>
                    </Link>
                    <Link to="/profile" className="text-black hover:text-darkBlue">
                        <button className="bg-blue-400 text-white font-bold w-30 py-2 px-4 text-lg">Profile</button>
                    </Link>
                    <Link to="/" className="text-black hover:text-darkBlue">
                        <button onClick={logout} className="bg-rose-400 text-white font-bold w-30 py-2 px-4 text-lg">
                        Logout
                        </button>
                    </Link>
                    </>
                ) : (
                    <>
                    <Link to="/login" className="text-black hover:text-darkBlue">
                        <button className="bg-green-400 text-white font-bold w-30 py-2 px-4 text-lg">Sign In</button>
                    </Link>
                    <Link to="/register" className="text-black hover:text-darkBlue">
                        <button className="bg-blue-400 text-white font-bold w-30 py-2 px-4 text-lg">Sign Up</button>
                    </Link>
                    </>
                )}
                </div>
            </div>
            </nav>


            {menuOpen && (
                <div className="absolute left-0 top-28 w-full h-full bg-stone-100 shadow-lg flex flex-col items-center gap-6 py-14 sm:hidden z-40 overflow-auto text-xl">
                    {isLoggedIn() ? (
                        <>
                            <p className='text-2xl font-bold mb-6'>Welcome {user?.username}!</p>
                            <Link to="/search" onClick={() => setMenuOpen(false)} className="w-full px-0.5">
                                <button className='bg-green-400 text-white font-bold w-full py-2.5'>Search</button>
                            </Link>
                            <Link to="/portfolio" onClick={() => setMenuOpen(false)} className="w-full px-0.5">
                                <button className='bg-amber-400 text-white font-bold w-full py-2.5'>Portfolio</button>
                            </Link>
                            <Link to="/arbitrage" onClick={() => setMenuOpen(false)} className="w-full px-0.5">
                                <button className='bg-purple-400 text-white font-bold w-full py-2.5'>Arbitrage</button>
                            </Link>
                            <Link to="/profile" onClick={() => setMenuOpen(false)} className="w-full px-0.5">
                                <button className='bg-blue-400 text-white font-bold w-full py-2.5'>Profile</button>
                            </Link>
                            <div className="w-full px-0.5">
                            <button onClick={() => { logout(); setMenuOpen(false); }} className='bg-rose-400 text-white font-bold w-full py-2.5'>Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setMenuOpen(false)} className="w-full px-0.5">
                                <button className='bg-green-400 text-white font-bold w-full py-2.5'>Sign In</button>
                            </Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)} className="w-full px-0.5">
                                <button className='bg-blue-400 text-white font-bold w-full py-2.5'>Sign Up</button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default Navbar;
