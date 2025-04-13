import React, { SyntheticEvent } from 'react'
import { CoinSearch } from '../../../coin';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';
import { searchCoins } from '../../../api';
import { Link } from 'react-router-dom';

interface Props {
    id: string;
    searchRes: CoinSearch;
    onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card = ({id, searchRes, onPortfolioCreate}: Props) => {
return (
    <div id='card' className='flex bg-stone-100 w-3/4 h-34 rounded-xl justify-between items-center ml-4 my-2 border-solid border-black border-4'>
    <Link to={`/coin/${id}`}>
        <div className='flex gap-8 m-8'>

                <img className='size-16' src={searchRes.large} alt={searchRes.name}/>

                <div className='text-left'>
                    <h1 className='text-lg font-medium mt-1 mb-0.5'>{searchRes.name} ({searchRes.symbol})</h1>
                    <h2 className='text-sm italic font-medium text-gray-500'>Market Cap Rank: #{searchRes.market_cap_rank}</h2>
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