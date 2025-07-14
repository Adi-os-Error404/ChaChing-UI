import React, { useState } from 'react';
import { detectArbitrageFromPort } from '../../Services/ArbitrageService';
import { ArbitrageDetails } from '../../Models/Arbitrage'
import Loader from '../../Components/Loader/Loader';
import ArbitrageCard from '../../Components/ArbitrageCard/ArbitrageCard';
import DisclaimerPage from '../../Components/Disclaimer/Disclaimer';

type Props = {}

const ArbitragePage = (props: Props) => {
    const [profitMargin, setProfitMargin] = useState<number>(0);
    const [arbitrageData, setArbitrageData] = useState<ArbitrageDetails[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfitMargin(parseFloat(e.target.value));
    }

    const handleDetectClick = async () => {
        setLoading(true);
        const res = await detectArbitrageFromPort(profitMargin);
        console.log(res)
        setArbitrageData(res!);
        setLoading(false);
    }

    return (
        <div className='max-h-[calc(100vh-8rem)]'>
            <DisclaimerPage/>
            <div className='md:flex justify-between'>
                    
                <h1 className='pt-8 ml-14 font-semibold text-4xl md:text-5xl text-start m-3 mb-10'>Arbitrage Detector</h1>
                <div className='bg-white rounded-2xl shadow-2xl p-4 m-4 md:py-6 md:px-4 md:w-[60%] md:m-6 md:mr-15'>
                <div className="flex items-center justify-center gap-4">
                    <label htmlFor="profit-margin" className="text-lg md:text-2xl font-semibold text-gray-800">
                        Profit Margin: <span className="text-green-500">{profitMargin.toFixed(2)}%</span>
                    </label>

                    <input
                        id="profit-margin"
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={profitMargin}
                        onChange={handleSliderChange}
                        className="w-[70%] md:w-[50%] h-2"
                    />

                    <button
                        onClick={handleDetectClick}
                        disabled={loading}
                        className="bg-purple-400 text-white font-bold py-2 px-6 text-lg rounded-md"
                    >
                        {loading ? "Detecting..." : "Detect"}
                    </button>
                </div>
                </div>
            </div>

            {loading ? (
                <div className='flex justify-center items-center h-full mt-20'><Loader /></div>
                ) : (
                    
                    arbitrageData && (
                        arbitrageData.length > 0 ? (
                            <div>
                                <p className="text-2xl md:text-3xl font-semibold text-gray-800 my-12 text-center">
                                    Total Arbitrages Found: <span className="text-green-500">{arbitrageData.length}</span>
                                </p>
                            <div className="grid md:grid-cols-4 gap-8 mx-14 my-10">
                                {arbitrageData.map((e, idx) => (
                                <ArbitrageCard
                                    key={idx}
                                    profit={e.profitPercentage}
                                    tradeSteps={e.tradeSteps}
                                />
                                ))}
                            </div>
                            </div>
                        ) 
                        : (
                            <p className='mt-30 text-xl text-gray-800 text-center'>No Arbitrage opportunities were detected</p>
                        )
                    )
                )
            }
        </div>
    );
}

export default ArbitragePage;
