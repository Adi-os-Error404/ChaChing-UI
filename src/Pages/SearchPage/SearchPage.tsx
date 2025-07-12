import React, { useState, SyntheticEvent, useEffect} from 'react'
import { CoinSearch, PortCoin } from '../../../coin';
import { searchCoins } from '../../../api';
import SearchBar from '../../Components/SearchBar/SearchBar';
import CardList from '../../Components/CardList/CardList';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import { Link } from 'react-router-dom';
import { PortfolioCoinDetails } from '../../Models/Coins';
import { addCoinToPort, deleteCoinFromPort, getCoinsInPort } from '../../Services/PortfolioService';
import PortfolioPage from '../PortfolioPage/PortfolioPage';
import { toast } from 'react-toastify';

type Props = {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = useState<string>("");
    const [searchRes, setSearchRes] = useState<CoinSearch[]>([]);
    const [serverErr, setServerErr] = useState<string | null>(null);
    const [refreshPort, setRefreshPort] = useState<number>(0);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    
    const onSearchSubmit = async (e: SyntheticEvent) => {
            e.preventDefault();
            const res = await searchCoins(search);
            if (typeof res === "string") {
            setServerErr(res);
        }
        else if (Array.isArray(res)) {
            setSearchRes(res);
        }
    };

    const onPortfolioCreate = async (coinId: string) => {
        try {
            const res = await addCoinToPort(coinId);
            if (res && res.data) {
                setRefreshPort(refreshPort+1);
                toast.success(coinId.toUpperCase() + " added to your portfolio!");
            }
        } catch (err) {
            toast.error("Failed to remove add coin");
        }
    };
    
    return (
        <>
            <div className='flex h-[calc(100vh-8rem)]'>
                <div className='pt-8 mx-8 md:ml-14 md:w-3/5'>
                    <h1 className='font-semibold text-4xl md:text-5xl text-start mx-4 mt-6 md:mb-8'>Search Coins</h1>
                    <div className="flex flex-col items-start">
                    <SearchBar
                        handleSearch={handleSearch}
                        search={search}
                        onSearchSubmit={onSearchSubmit}
                    />
                    {serverErr && <h1 className='m-6'>{serverErr}</h1>}
                    
                    <CardList 
                        searchRes={searchRes}
                        onPortfolioCreate={onPortfolioCreate}
                    />
                    </div>
                </div>
                <div className='bg-stone-200 w-2/5 hidden md:block'>
                    <PortfolioPage refreshTrigger={refreshPort} />
                </div> 
            </div>
        </>
    )
}

export default SearchPage