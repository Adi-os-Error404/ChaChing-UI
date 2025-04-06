import React from 'react'
import logo from '../../assets/logo.png'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <nav className="fixed top-0 left-0 z-50 w-full h-32 p-1 bg-stone-100 shadow-lg flex items-center">
            <img className="h-full p-2 ml-12" src={logo} alt="logo" />
        </nav>
    )
}

export default Navbar