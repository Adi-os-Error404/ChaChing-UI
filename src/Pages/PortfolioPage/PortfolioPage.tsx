import React, { useEffect, useState } from 'react'
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio'
import { PortfolioCoinDetails } from '../../Models/Coins';
import { getCoinsInPort, deleteCoinFromPort } from '../../Services/PortfolioService';
import Spinner from '../../Components/Spinner/Spinner';
import { toast } from 'react-toastify';

interface Props {
    refreshTrigger?: number;
}

const PortfolioPage = ({ refreshTrigger }: Props) => {
    const [loading, setLoading] = useState(true);
    const [portCoins, setPortCoins] = useState<PortfolioCoinDetails[]>([]);

    useEffect(() => {
        const getPort = async() => {
            const res = await getCoinsInPort();
            if (res && res.data) {
                setPortCoins(res.data);
                setLoading(false);
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
    
    if (loading) return <Spinner />;
    return (
        <div className='max-h-[calc(100vh-8rem)] overflow-y-hidden'>
            <h1 className='pt-8 ml-14 font-semibold mt-6 text-4xl md:text-5xl text-start mb-6 mx-4 md:mb-10'>My Portfolio</h1>
            <div className='h-[120vh] md:h-[100vh]'>
                <ListPortfolio portfolioVals={portCoins} onPortfolioDelete={handleDeleteCoin} />
            </div>
        </div>
    )
}

export default PortfolioPage