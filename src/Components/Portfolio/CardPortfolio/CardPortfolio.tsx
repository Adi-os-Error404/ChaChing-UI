import React, { SyntheticEvent } from 'react'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio';
import { Link } from 'react-router-dom';

interface Props {
    id: string;
    symbol: string;
    name: string;
    imgLink: string;
    onPortfolioDelete: (coinId: string) => void;
}

const CardPortfolio = ({id,symbol, name, imgLink, onPortfolioDelete}: Props) => {
  return (
      <div id='card' className='flex bg-stone-100 h-30 rounded-xl justify-between items-center mx-14 my-4 border-solid border-black border-4 p-2'>
        <Link to={`/coin/${id}`}>
          <div className='flex items-center mr-2 md:mr-0'>
            <img className='size-12 m-4' src={imgLink} alt={name}/>
              <h1 className='md:text-lg mt-1 mb-0.5 font-semibold'>{name} <span className='text-gray-700'>({symbol.toUpperCase()})</span></h1>
          </div>
        </Link>
        <DeletePortfolio portfolioVal={id} onPortfolioDelete={onPortfolioDelete} />
      </div>
  )
}

export default CardPortfolio