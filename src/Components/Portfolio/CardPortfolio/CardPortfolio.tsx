import React, { SyntheticEvent } from 'react'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio';
import { Link } from 'react-router-dom';

interface Props {
    id: string;
    symbol: string;
    name: string;
    imgLink: string;
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const CardPortfolio = ({id,symbol, name, imgLink, onPortfolioDelete}: Props) => {
  return (
    <div className='flex bg-stone-100 h-30 rounded-xl justify-between items-center mx-14 my-4 border-solid border-black border-4 p-2'>
        <Link to={`/coin/${id}`} className='flex items-center'>
          <img className='size-12 m-4' src={imgLink} alt={name}/>
            <h1 className='text-lg font-medium mt-1 mb-0.5'>{name} ({symbol})</h1>
        </Link>
        <DeletePortfolio portfolioVal={symbol} onPortfolioDelete={onPortfolioDelete} />
    </div>
  )
}

export default CardPortfolio