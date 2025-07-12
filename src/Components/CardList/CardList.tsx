import React, { SyntheticEvent } from 'react'
import Card from '../Card/Card'
import { CoinSearch } from '../../../coin';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    searchRes: CoinSearch[];
    onPortfolioCreate: (coinId: string) => void;
}

const CardList = ({searchRes, onPortfolioCreate}: Props) => {

    return (
        <div className="h-[62vh] md:h-[52vh] overflow-y-auto no-scrollbar border-gray-300 w-full mt-2">
        {searchRes.length > 0 ? (
            searchRes.map((res) => (
            <Card
                id={res.id}
                key={uuidv4()}
                searchRes={res}
                onPortfolioCreate={onPortfolioCreate}
            />
            ))
        ) : (
            <h1 className="m-6">No Results</h1>
        )}
        </div>
    );
}

export default CardList