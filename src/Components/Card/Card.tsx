import React from 'react'
import { CoinSearch } from '../../../coin';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
    id: string;
    searchRes: CoinSearch;
    onPortfolioCreate: (coinId: string) => void;
}

const Card = ({ id, searchRes, onPortfolioCreate }: Props) => {
    const navigate = useNavigate();

    const handleInspectClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/coin/${id}`);
    };

    return (
        <div id='card' className='flex bg-stone-100 h-30 md:w-3/4 md:h-34 rounded-xl justify-between items-center ml-4 my-2 border-solid border-black border-4'>

            <Link to={`/coin/${id}`} className='flex-grow'>
                <div className='flex gap-3 m-4 md:gap-8 md:m-8'>

                    <img className='size-14 md:size-16 mr-2 md:mr-0' src={searchRes.large} alt={searchRes.name} />

                    <div className='text-left'>
                        <h1 className='md:text-lg font-medium mt-1 md:mb-0.5'>
                            {searchRes.name} <br className='block md:hidden' /> ({searchRes.symbol})
                        </h1>
                        <h2 className='hidden md:block text-sm italic font-medium text-gray-500'>
                            Market Cap Rank: #{searchRes.market_cap_rank}
                        </h2>
                    </div>
                </div>
            </Link>

            <div className='flex items-center m-4 gap-3 md:gap-6 md:m-8'>
                <button
                    onClick={handleInspectClick}
                    className='bg-blue-400 font-bold text-sm size-10 p-1.5 text-white rounded-xl'
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                </button>


                <AddPortfolio
                    onPortfolioCreate={onPortfolioCreate}
                    id={id}
                    name={searchRes.name}
                    symbol={searchRes.symbol}
                    imgLink={searchRes.large}
                />
            </div>
        </div>
    );
};

export default Card;
