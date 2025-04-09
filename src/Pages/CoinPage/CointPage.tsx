import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CoinDetails } from '../../../coin';
import { getCoinDetails } from '../../../api';
import CoinChart from '../../Components/CoinChart/CoinChart';
import Spinner from '../../Components/Spinner/Spinner';
import Tile from '../../Components/Tile/Tile';
import SentimentDisplay from '../../Components/SentimentDisplay/SentimentDisplay';

interface Props {}

const CointPage = (props: Props) => {

    let { id } = useParams();
    const [coin, setCoin] = useState<CoinDetails>();

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
            const res = await getCoinDetails(id!);
            res && setCoin(res);
        }
        getCoinInit();
        console.log(coin)

    }, []);
    console.log(coin)
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
                        <div className='space-x-4'>
                            {isValidLink(coin.links.homepage) && (<a href={coin.links.homepage![0]} target="_blank" rel="noopener noreferrer">
                                <button style={{borderRadius: '50%'}} className='p-1.5'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M20.625 15C20.625 16.3008 20.5547 17.5547 20.4316 18.75H9.57422C9.44531 17.5547 9.38086 16.3008 9.38086 15C9.38086 13.6992 9.45117 12.4453 9.57422 11.25H20.4316C20.5605 12.4453 20.625 13.6992 20.625 15ZM22.3125 11.25H29.5254C29.8359 12.4512 30 13.7051 30 15C30 16.2949 29.8359 17.5488 29.5254 18.75H22.3125C22.4355 17.543 22.5 16.2891 22.5 15C22.5 13.7109 22.4355 12.457 22.3125 11.25ZM28.9102 9.375H22.0723C21.4863 5.63086 20.3262 2.49609 18.832 0.492187C23.4199 1.70508 27.1523 5.0332 28.9043 9.375H28.9102ZM20.1738 9.375H9.82617C10.1836 7.24219 10.7344 5.35547 11.4082 3.82617C12.0234 2.44336 12.709 1.44141 13.3711 0.808594C14.0273 0.1875 14.5723 0 15 0C15.4277 0 15.9727 0.1875 16.6289 0.808594C17.291 1.44141 17.9766 2.44336 18.5918 3.82617C19.2715 5.34961 19.8164 7.23633 20.1738 9.375ZM7.92773 9.375H1.08984C2.84766 5.0332 6.57422 1.70508 11.168 0.492187C9.67383 2.49609 8.51367 5.63086 7.92773 9.375ZM0.474609 11.25H7.6875C7.56445 12.457 7.5 13.7109 7.5 15C7.5 16.2891 7.56445 17.543 7.6875 18.75H0.474609C0.164063 17.5488 0 16.2949 0 15C0 13.7051 0.164063 12.4512 0.474609 11.25ZM11.4082 26.168C10.7285 24.6445 10.1836 22.7578 9.82617 20.625H20.1738C19.8164 22.7578 19.2656 24.6445 18.5918 26.168C17.9766 27.5508 17.291 28.5527 16.6289 29.1855C15.9727 29.8125 15.4277 30 15 30C14.5723 30 14.0273 29.8125 13.3711 29.1914C12.709 28.5586 12.0234 27.5566 11.4082 26.1738V26.168ZM7.92773 20.625C8.51367 24.3691 9.67383 27.5039 11.168 29.5078C6.57422 28.2949 2.84766 24.9668 1.08984 20.625H7.92773ZM28.9102 20.625C27.1523 24.9668 23.4258 28.2949 18.8379 29.5078C20.332 27.5039 21.4863 24.3691 22.0781 20.625H28.916H28.9102Z" fill="black"/></svg></button>
                            </a>)}
                            {isValidLink(coin.links.whitepaper) && (
                            <a href={coin.links.whitepaper!} target="_blank" rel="noopener noreferrer">
                                <button style={{borderRadius: '50%'}} className='p-1.5'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none"><path d="M15.2579 13.9355L7.70514 0.939453C7.69378 0.920001 7.67753 0.903863 7.658 0.892648C7.63846 0.881432 7.61633 0.87553 7.59381 0.87553C7.57129 0.87553 7.54915 0.881432 7.52962 0.892648C7.51009 0.903863 7.49383 0.920001 7.48248 0.939453L0.0176364 13.9355C0.00632249 13.9551 0.000366211 13.9774 0.000366211 14C0.000366211 14.0226 0.00632249 14.0449 0.0176364 14.0645L7.56451 27.0605C7.57587 27.08 7.59212 27.0961 7.61165 27.1074C7.63119 27.1186 7.65332 27.1245 7.67584 27.1245C7.69836 27.1245 7.72049 27.1186 7.74003 27.1074C7.75956 27.0961 7.77581 27.08 7.78717 27.0605L15.2579 14.0645C15.2692 14.0449 15.2751 14.0226 15.2751 14C15.2751 13.9774 15.2692 13.9551 15.2579 13.9355ZM17.5489 12.4297C17.5602 12.4492 17.5764 12.4655 17.5959 12.4768C17.6155 12.4881 17.6376 12.4941 17.6602 12.4941H21.5567C21.5793 12.4941 21.6015 12.4881 21.621 12.4768C21.6406 12.4654 21.6568 12.4491 21.6681 12.4296C21.6794 12.41 21.6853 12.3878 21.6853 12.3652C21.6853 12.3426 21.6793 12.3204 21.668 12.3008L15.1817 0.939453C15.1704 0.919902 15.1542 0.903658 15.1347 0.892347C15.1151 0.881036 15.0929 0.875054 15.0704 0.875H11.1739C11.1513 0.875054 11.1291 0.88105 11.1095 0.892385C11.09 0.903721 11.0738 0.919999 11.0625 0.939586C11.0512 0.959173 11.0453 0.981381 11.0453 1.00398C11.0453 1.02658 11.0513 1.04879 11.0626 1.06836L17.5489 12.4297ZM29.9825 13.9355L22.5528 0.939453C22.5415 0.919902 22.5253 0.903658 22.5057 0.892347C22.4862 0.881036 22.464 0.875054 22.4415 0.875H18.5391C18.5165 0.875054 18.4943 0.88105 18.4748 0.892385C18.4552 0.903721 18.439 0.919999 18.4277 0.939586C18.4164 0.959173 18.4105 0.981381 18.4105 1.00398C18.4105 1.02658 18.4165 1.04879 18.4278 1.06836L25.8223 14L18.4278 26.9316C18.4165 26.9512 18.4105 26.9734 18.4105 26.996C18.4105 27.0186 18.4164 27.0408 18.4277 27.0604C18.439 27.08 18.4552 27.0963 18.4748 27.1076C18.4943 27.1189 18.5165 27.1249 18.5391 27.125H22.4415C22.464 27.1249 22.4862 27.119 22.5057 27.1077C22.5253 27.0963 22.5415 27.0801 22.5528 27.0605L29.9825 14.0645C29.9938 14.0449 29.9998 14.0226 29.9998 14C29.9998 13.9774 29.9938 13.9551 29.9825 13.9355ZM21.4454 15.6934H17.5489C17.5263 15.6934 17.5041 15.6994 17.4846 15.7107C17.4651 15.722 17.4488 15.7383 17.4376 15.7578L11.0626 26.9258C11.0513 26.9454 11.0453 26.9676 11.0453 26.9902C11.0453 27.0128 11.0512 27.035 11.0625 27.0546C11.0738 27.0741 11.09 27.0904 11.1095 27.1018C11.1291 27.1131 11.1513 27.1191 11.1739 27.1191H15.0704C15.0929 27.1191 15.1151 27.1131 15.1347 27.1018C15.1542 27.0905 15.1704 27.0742 15.1817 27.0547L21.5567 15.8867C21.568 15.8671 21.574 15.8449 21.574 15.8223C21.574 15.7997 21.5681 15.7775 21.5568 15.7579C21.5455 15.7384 21.5293 15.7221 21.5097 15.7107C21.4902 15.6994 21.468 15.6934 21.4454 15.6934Z" fill="black"/></svg></button>
                            </a>)}
                            {isValidLink(coin.links.subreddit_url) && (
                            <a href={coin.links.subreddit_url!} target="_blank" rel="noopener noreferrer">
                                <button style={{borderRadius: '50%'}} className='p-1.5'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="27" viewBox="0 0 30 27" fill="none"><path d="M21.8555 6.24609C20.3789 6.24609 19.1426 5.2207 18.8145 3.84375C17.0215 4.0957 15.6387 5.64258 15.6387 7.5V7.51172C18.416 7.61719 20.9473 8.39648 22.957 9.63867C23.6953 9.07031 24.6211 8.73047 25.623 8.73047C28.043 8.73047 30 10.6875 30 13.1074C30 14.8535 28.9805 16.3594 27.498 17.0625C27.3574 22.1484 21.8145 26.2383 15.0059 26.2383C8.19727 26.2383 2.66602 22.1543 2.51953 17.0742C1.03125 16.377 0 14.8652 0 13.1074C0 10.6875 1.95703 8.73047 4.37695 8.73047C5.38477 8.73047 6.31055 9.07031 7.05469 9.64453C9.04688 8.4082 11.5547 7.62891 14.3027 7.51172V7.49414C14.3027 4.89844 16.2773 2.75391 18.8027 2.48438C19.0898 1.06641 20.3438 0 21.8555 0C23.5781 0 24.9785 1.40039 24.9785 3.12305C24.9785 4.8457 23.5781 6.24609 21.8555 6.24609ZM9.22852 13.084C8.00391 13.084 6.94922 14.3027 6.87305 15.8906C6.79688 17.4785 7.875 18.123 9.09961 18.123C10.3242 18.123 11.2441 17.5488 11.3145 15.9609C11.3848 14.373 10.4531 13.084 9.22266 13.084H9.22852ZM23.1445 15.8848C23.0742 14.2969 22.0195 13.0781 20.7891 13.0781C19.5586 13.0781 18.627 14.3672 18.6973 15.9551C18.7676 17.543 19.6875 18.1172 20.9121 18.1172C22.1367 18.1172 23.2148 17.4727 23.1387 15.8848H23.1445ZM19.623 20.0332C19.7109 19.8223 19.5645 19.582 19.3359 19.5586C17.9883 19.4238 16.5293 19.3477 15.0117 19.3477C13.4941 19.3477 12.0352 19.4238 10.6875 19.5586C10.459 19.582 10.3125 19.8223 10.4004 20.0332C11.1562 21.8379 12.9375 23.1035 15.0117 23.1035C17.0859 23.1035 18.8672 21.8379 19.623 20.0332Z" fill="black"/></svg></button></a>)}

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
                    </div>
                </div>

            ) : (
                <Spinner />
            )
        }
        </>
    )
}

export default CointPage