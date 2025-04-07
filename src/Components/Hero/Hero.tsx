import React from "react";
import hero from "./hero.png";
import { Link } from "react-router";

interface Props {}

const Hero = (props: Props) => {
    return (
        <section id="hero">
        <div className="container flex flex-col-reverse mx-auto p-8 lg:flex-row">
            <div className="flex flex-col space-y-10 mb-44 m-10 lg:m-10 xl:m-20 lg:mt:16 lg:w-1/2 xl:mb-52">
            <h1 className="text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-left">
                Your Money, Reimagined.
            </h1>
            <p className="text-2xl text-center text-gray-500 lg:max-w-md lg:text-left">
            Track, search, and manage crypto market!
            </p>
            <p className="text-2xl text-center text-gray-500 lg:max-w-md lg:text-left">
            All in one powerful platform - gives you real-time analytics, insights, and tools to make smarter financial decisions.
            </p>
            </div>
            <div className="mb-24 mx-auto md:w-180 md:px-10 lg:mb-0 lg:w-1/2">
            <img src={hero} alt="hero"/>
            </div>
        </div>
        </section>
    );
};

export default Hero;