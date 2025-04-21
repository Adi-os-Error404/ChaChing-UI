import React, { useEffect, useState } from 'react'
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio'
import { PortfolioCoinDetails } from '../../Models/Coins';
import { getCoinsInPort, deleteCoinFromPort } from '../../Services/PortfolioService';
import { toast } from 'react-toastify';

interface Props {
    refreshTrigger?: number;
}

const PortfolioPage = ({ refreshTrigger }: Props) => {

    const [portCoins, setPortCoins] = useState<PortfolioCoinDetails[]>([]);

    useEffect(() => {
        const getPort = async() => {
            const res = await getCoinsInPort();
            if (res && res.data) {
                setPortCoins(res.data);
            }
        }
        getPort();
    }, [refreshTrigger]);

    const handleDeleteCoin = async (coinId: string) => {
        try {
            await deleteCoinFromPort(coinId);
            setPortCoins(prev => prev.filter(coin => coin.coinId !== coinId));
            toast.success(coinId.toUpperCase() + " removed from portfolio!")
        } catch (err) {
            toast.error("Failed to remove " + coinId.toUpperCase());
        }
    };
    

    return (
        <div className='max-h-[calc(100vh-8rem)] overflow-y-hidden'>
            <h1 className='pt-8 ml-14 font-semibold text-5xl text-start m-3 mb-10'>My Portfolio</h1>
            <div className='h-[100vh]'>
                <ListPortfolio portfolioVals={portCoins} onPortfolioDelete={handleDeleteCoin} />
            </div>
        </div>
    )
}

export default PortfolioPage