import React, { SyntheticEvent } from 'react'
import { CoinSearch } from '../../../coin';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';
import { searchCoins } from '../../../api';
import { Link } from 'react-router-dom';

interface Props {
    id: string;
    searchRes: CoinSearch;
    onPortfolioCreate: (coinId: string) => void;
}

const Card = ({id, searchRes, onPortfolioCreate}: Props) => {
return (
    <div id='card' className='flex bg-stone-100 h-30 md:w-3/4 md:h-34 rounded-xl justify-between items-center ml-4 my-2 border-solid border-black border-4'>
    <Link to={`/coin/${id}`}>
        <div className='flex gap-4 m-4 md:gap-8 md:m-8'>

                <img className='size-16 mr-2 md:mr-0' src={searchRes.large} alt={searchRes.name}/>

                <div className='text-left'>
                    <h1 className='md:text-lg font-medium mt-1 md:mb-0.5'>{searchRes.name} <br className='block md:hidden'/> ({searchRes.symbol})</h1>
                    <h2 className='hidden md:block text-sm italic font-medium text-gray-500'>Market Cap Rank: #{searchRes.market_cap_rank}</h2>
                </div>
        </div>
    </Link>
    <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        id={id}
        name={searchRes.name}
        symbol={searchRes.symbol}
        imgLink={searchRes.large}
    />

    </div>
)
}

export default Card