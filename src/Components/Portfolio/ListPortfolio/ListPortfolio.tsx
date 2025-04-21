import React, { SyntheticEvent } from 'react'
import CardPortfolio from '../CardPortfolio/CardPortfolio';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'
import { PortfolioCoinDetails } from '../../../Models/Coins';


interface Props {
    portfolioVals: PortfolioCoinDetails[];
    onPortfolioDelete: (coinId: string) => void;
}

const ListPortfolio = ({portfolioVals, onPortfolioDelete}: Props) => {
    return (
        <>
            <div style={{ height: "60%" }}  className="overflow-y-auto no-scrollbar border-gray-300 w-full mt-2">
                {portfolioVals &&
                    portfolioVals.map((val) => {
                        return <CardPortfolio
                                    id={val.coinId} 
                                    symbol={val.symbol}
                                    name={val.name}
                                    imgLink={val.imgUrl}
                                    key={uuidv4()}
                                    onPortfolioDelete={onPortfolioDelete}
                                />
                    })
                }
            </div>
        </>

    )
}

export default ListPortfolio