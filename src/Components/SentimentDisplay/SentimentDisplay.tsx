import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface SentimentProps {
  upPercentage: number;
  downPercentage: number;
}

const SentimentDisplay: React.FC<SentimentProps> = ({ upPercentage, downPercentage }) => {
    return (
        <div className="flex flex-col items-center p-4">
        <h3 className="text-xl font-bold mb-4">User Sentiment</h3>

        <div className="flex gap-4 items-center mb-4">
            <div className="flex flex-col items-center">
            <div
                className={`text-4xl ${upPercentage > 50 ? "text-green-500" : "text-gray-500"}`}
            >
                <FaArrowUp />
            </div>
            <p className="text-sm text-green-500 font-bold">{upPercentage.toFixed(2)}%</p>
            </div>
            <div className="flex flex-col items-center">
            <div
                className={`text-4xl ${downPercentage > 50 ? "text-red-500" : "text-gray-500"}`}
            >
                <FaArrowDown />
            </div>
            <p className="text-sm text-rose-500 font-bold">{downPercentage.toFixed(2)}%</p>
            </div>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2 relative">
            <div
            className="absolute top-0 left-0 h-2 bg-green-500 rounded-full"
            style={{ width: `${upPercentage}%` }}
            ></div>
            <div
            className="absolute top-0 right-0 h-2 bg-rose-500 rounded-full"
            style={{ width: `${downPercentage}%` }}
            ></div>
        </div>
        </div>
    );
};

export default SentimentDisplay;
