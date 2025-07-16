import React, { SyntheticEvent } from 'react'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
    id: string;
    symbol: string;
    name: string;
    imgLink: string;
    onPortfolioDelete: (coinId: string) => void;
}

const CardPortfolio = ({id,symbol, name, imgLink, onPortfolioDelete}: Props) => {
    const navigate = useNavigate();

    const handleInspectClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/coin/${id}`);
    };

  return (
      <div id='card' className='flex bg-stone-100 h-30 rounded-xl justify-between items-center ml-14 mr-8 my-4 border-solid border-black border-4'>
        <Link to={`/coin/${id}`}>
          <div className='flex items-center mr-2'>
            <img className='size-14 md:size-16 m-4 md:m-6' src={imgLink} alt={name}/>
              <h1 className='md:text-lg mt-1 mb-0.5 font-semibold'>{name} <span className='text-gray-700'>({symbol.toUpperCase()})</span></h1>
          </div>
        </Link>
        <div className='flex items-center m-4 gap-3 md:gap-5.5 md:m-8'>
                <button
                    onClick={handleInspectClick}
                    className='bg-blue-400 font-bold text-sm size-10 p-1.5 text-white rounded-xl'
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                </button>
        <DeletePortfolio portfolioVal={id} onPortfolioDelete={onPortfolioDelete} />
      </div>
      </div>
  )
}

export default CardPortfolio