import React, { SyntheticEvent } from 'react'

interface Props {
    portfolioVal: string;
    onPortfolioDelete: (coinId: string) => void;
}

const DeletePortfolio = ({portfolioVal, onPortfolioDelete}: Props) => {

  const handleDelete = (e: React.FormEvent) => {
      e.preventDefault();
      onPortfolioDelete(portfolioVal);
  };

  return (
    <form onSubmit={handleDelete}>
        <input readOnly={true} hidden={true} value={portfolioVal} />
        <button type='submit' className="bg-rose-400 font-bold text-sm size-10 p-2 text-white rounded-xl">
        <svg className='size-full'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
        </button>
    </form>
  )
}

export default DeletePortfolio