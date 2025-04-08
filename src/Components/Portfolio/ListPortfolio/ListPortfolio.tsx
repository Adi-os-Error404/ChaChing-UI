import React, { SyntheticEvent } from 'react'
import CardPortfolio from '../CardPortfolio/CardPortfolio';
import { v4 as uuidv4 } from 'uuid';
import { PortCoin } from '../../../../coin';


interface Props {
    portfolioVals: PortCoin[];
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const ListPortfolio = ({portfolioVals, onPortfolioDelete}: Props) => {
    return (
        <>
            <div className="h-[50vh] overflow-y-auto no-scrollbar border-gray-300 w-full mt-2">
                {portfolioVals &&
                    portfolioVals.map((val) => {
                        return <CardPortfolio
                                    id={val.id} 
                                    symbol={val.symbol}
                                    name={val.name}
                                    imgLink={val.imgLink}
                                    key={uuidv4()}
                                    onPortfolioDelete={onPortfolioDelete}
                                />
                    })
                }
            </div>
            <button className='mt-8 bg-blue-400 text-white font-bold py-2 px-4 text-lg'>View Full Portfolio 
                <svg className="inline disp size-6 m-1" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.625 4.625H24.375C25.4121 4.625 26.25 5.46289 26.25 6.5V21.5C26.25 22.5371 25.4121 23.375 24.375 23.375H20.625C19.5879 23.375 18.75 24.2129 18.75 25.25C18.75 26.2871 19.5879 27.125 20.625 27.125H24.375C27.4805 27.125 30 24.6055 30 21.5V6.5C30 3.39453 27.4805 0.875 24.375 0.875H20.625C19.5879 0.875 18.75 1.71289 18.75 2.75C18.75 3.78711 19.5879 4.625 20.625 4.625ZM20.0742 15.3242C20.8066 14.5918 20.8066 13.4023 20.0742 12.6699L12.5742 5.16992C11.8418 4.4375 10.6523 4.4375 9.91992 5.16992C9.1875 5.90234 9.1875 7.0918 9.91992 7.82422L14.2207 12.125H1.875C0.837891 12.125 0 12.9629 0 14C0 15.0371 0.837891 15.875 1.875 15.875H14.2207L9.91992 20.1758C9.1875 20.9082 9.1875 22.0977 9.91992 22.8301C10.6523 23.5625 11.8418 23.5625 12.5742 22.8301L20.0742 15.3301V15.3242Z" fill="white"/>
                </svg>
            </button>
        </>

    )
}

export default ListPortfolio