import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <nav className="fixed top-0 left-0 z-50 w-full h-32 bg-stone-100 shadow-lg items-center pr-12">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-20">
                    <Link to="/">
                        <img className="h-full p-4 ml-12 w-50" src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="font-bold lg:flex">
                    <Link to="/search" className="text-black hover:text-darkBlue">
                        <button className='bg-blue-400 text-white font-bold py-2 px-4 text-lg'>Search</button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar