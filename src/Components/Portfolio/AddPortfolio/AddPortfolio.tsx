import React, { SyntheticEvent } from 'react'
import { PortCoin } from '../../../../coin';

interface Props {
    onPortfolioCreate: (e: SyntheticEvent) => void;
    symbol: string;
    name: string;
    imgLink: string;
}

const AddPortfolio = ({onPortfolioCreate, symbol, name, imgLink}: Props) => {
  const coinData: PortCoin = {
      symbol: symbol,
      name: name,
      imgLink: imgLink
  }
  return (
    <form onSubmit={onPortfolioCreate}>
        <input readOnly={true} hidden={true} 
          value={JSON.stringify(coinData)}
        />
        <button 
        type='submit' 
        className="bg-rose-400 font-bold text-sm size-10 p-2 text-white rounded-xl m-8">
            <svg className='size-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
        </button>
    </form>
  )
}

export default AddPortfolio