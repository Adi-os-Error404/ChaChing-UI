import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CoinDetails } from '../../../coin';
import { getCoinDetails } from '../../../api';

interface Props {}

const CointPage = (props: Props) => {

    let { id } = useParams();
    const [coin, setCoin] = useState<CoinDetails>();

    useEffect(() => {
        const getCoinInit = async() => {
            const res = await getCoinDetails(id!);
            res && setCoin(res);
            console.log(res)
        }
        getCoinInit();
    }, []);

    return (
        <>
        {
            coin ? (
                <div>{coin.name}</div>
            ) : (
                <div>Coin not found!</div>
            )
        }
        </>
    )
}

export default CointPage