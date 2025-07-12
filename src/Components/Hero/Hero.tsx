import React from "react";
import hero from "./hero.png";
import { Link } from "react-router";

interface Props {}

const Hero = (props: Props) => {
    return (
        <section id="hero">
        <div className="container flex flex-col-reverse mx-auto p-8 lg:flex-row">
            <div className="text-start flex flex-col space-y-10 mb-44 m-8 lg:m-14 lg:ml-16  lg:w-1/2">
            <h1 className="text-5xl font-bold lg:text-6xl lg:max-w-md lg:text-left">
                Not Just a Crypto App.
            </h1>
            <img src={hero} alt="hero" className="block lg:hidden" />

            <p className="text-2xl font-semibold text-gray-800 text-gray-500 lg:max-w-md lg:text-left">
                Track Arbitrages.<br />
                Monitor the Market. Manage a Portfolio.<br /><hr className="my-1.5 border-t-2 border-blue-300" />
                All in one powerful tool.
            </p>
            <p className="text-2xl text-gray-500 lg:max-w-md lg:text-left">
            Get instant access to live market data, intelligent insights, and smart tools designed to help you spot profitable trades and stay ahead of the curve.
            </p>
            </div>
            <div className="hidden lg:block mb-24 mx-auto md:w-180 md:px-10 lg:mb-0 lg:w-1/2">
            <img src={hero} alt="hero" className="w-full h-auto" />
            </div>
        </div>
        </section>
    );
};

export default Hero;