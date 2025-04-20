import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CoinChart from '../../Components/CoinChart/CoinChart';
import Spinner from '../../Components/Spinner/Spinner';
import Tile from '../../Components/Tile/Tile';
import SentimentDisplay from '../../Components/SentimentDisplay/SentimentDisplay';
import CoinComment from '../../Components/CoinComment/CoinComment';
import { getCoinFullDetails } from '../../Services/CoinService';
import { CoinFullDetails } from '../../Models/Coins';
import { useAuth } from '../../Context/useAuth';

interface Props {}

const CoinPage = (props: Props) => {

    let { id } = useParams();
    const { user } = useAuth();
    const [coin, setCoin] = useState<CoinFullDetails>();

    const getFormattedValue = (value: number | null | undefined, suffix: string = '', prefix: string = '') => {
        if (value === null || value === undefined) {
            return "";
        }
        return `${prefix}${value.toLocaleString()} ${suffix}`;
    };
    const isValidLink = (link: string[] | string | null): boolean => {
        return link !== null && link.length > 0;
    };    

    useEffect(() => {
        const getCoinInit = async() => {
            const res = await getCoinFullDetails(id!);
            if (res && res.data) {
                setCoin(res.data);
            }
        }
        getCoinInit();
    }, [id]);
    
    return (
        <>
        {
            coin ? (
                <div className='m-10 '>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <img className='size-20 mr-8' src={coin.image.large!} alt={coin.name}/>
                            <h1 className='text-5xl font-bold text-left'>{`${coin.name} (${coin.symbol.toLocaleUpperCase()})`}</h1>
                        </div>
                    </div>
                    <div className='m-12 grid gap-y-12'>
                        <div className="grid grid-cols-4 gap-4">
                            <Tile title={'Market Cap Rank'} subTitle={getFormattedValue(coin.market_cap_rank, '', '#')} />
                            <Tile title={'Genesis Date'} subTitle={`${coin.genesis_date}`} />
                            <Tile 
                                title={'Active Watchlist Users'} 
                                subTitle={getFormattedValue(coin.watchlist_portfolio_users)} 
                            />
                            <Tile 
                                title={'Current Price'} 
                                subTitle={getFormattedValue(coin.market_data.current_price.usd, 'USD')} 
                            />
                        </div>
                        <div className='p-8  bg-white rounded-lg shadow-lg'>
                            <CoinChart coinId={coin.id} />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <Tile 
                                title={'Total Supply'} 
                                subTitle={getFormattedValue(coin.market_data.total_supply)} 
                            />
                            <Tile 
                                title={'All Time High'} 
                                subTitle={getFormattedValue(coin.market_data.ath.usd, 'USD')} 
                            />
                            <Tile 
                                title={'All Time Low'} 
                                subTitle={getFormattedValue(coin.market_data.atl.usd, 'USD')} 
                            />
                            <Tile 
                                title={'Max Supply'} 
                                subTitle={getFormattedValue(coin.market_data.max_supply)} 
                            />
                            <Tile 
                                title={'Market Cap'} 
                                subTitle={getFormattedValue(coin.market_data.market_cap.usd, 'USD')} 
                            />
                            <Tile 
                                title={'High 24h'} 
                                subTitle={getFormattedValue(coin.market_data.high_24h.usd, 'USD')} 
                            />
                            <Tile 
                                title={'Low 24h'} 
                                subTitle={getFormattedValue(coin.market_data.low_24h.usd, 'USD')} 
                            />
                            <Tile 
                                title={'Circulating Supply'} 
                                subTitle={getFormattedValue(coin.market_data.circulating_supply)} 
                            />
                        </div>
                        <div className='bg-white rounded-lg shadow-lg p-8'>
                        <SentimentDisplay upPercentage={coin.sentiment_votes_up_percentage || 0} downPercentage={coin.sentiment_votes_down_percentage || 0} />
                        </div>
                        <div>
                            <CoinComment coinId={coin.id} comments={coin.comments} user={user!} />
                        </div>
                    </div>
                </div>

            ) : (
                <Spinner />
            )
        }
        </>
    )
}

export default CoinPage