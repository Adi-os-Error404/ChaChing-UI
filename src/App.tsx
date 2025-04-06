import React, { useState, SyntheticEvent} from 'react'
import './App.css'
import CardList from './Components/CardList/CardList'
import SearchBar from './Components/SearchBar/SearchBar'
import { searchCoins } from '../api'
import { CoinSearch, PortCoin } from '../coin'
import Navbar from './Components/Navbar/Navbar'
import ListPortfolio from './Components/Portfolio/ListPortfolio/ListPortfolio'

function App() {

  const [search, setSearch] = useState<string>("");
  const [searchRes, setSearchRes] = useState<CoinSearch[]>([]);
  const [serverErr, setServerErr] = useState<string | null>(null);
  const [portfolioVals, setPortfolioVals] = useState<PortCoin[]>([]);

  // SearchBar: When user types in the search bar, change search str
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
  }
  
  // SearchBar: When user submits the search string
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const res = await searchCoins(search);
    if (typeof res === "string") {
      setServerErr(res);
    }
    else if (Array.isArray(res)) {
      setSearchRes(res);
    }
  };

  // Add Button in Coin Card: When user clicks add button on coin card
  const onPortfolioCreate = (e: any)  => {
    e.preventDefault();
    const addCoin: PortCoin = JSON.parse(e.target[0].value);
    const exists = portfolioVals.find((coin) => {
      return coin.symbol === addCoin.symbol;
    })
    if (exists) return;
    const updatedPortVals = [...portfolioVals, addCoin]
    setPortfolioVals(updatedPortVals);
  }

  // Delet Button in Port Coin Card: Remove a coin from Portfolio
  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const removedPort = portfolioVals.filter((val) => {
      return val.symbol !== e.target[0].value;
    });
    setPortfolioVals(removedPort);
  }


  return (
    <>
    <Navbar />

    <div className='flex min-h-screen'>

      <div className='mt-42 ml-24 w-3/5'>
        <h1 className='font-semibold text-5xl text-start m-3 mb-8'>Search Coins</h1>
        <div className="flex flex-col items-start">
          <SearchBar
            handleSearch={handleSearch}
            search={search}
            onSearchSubmit={onSearchSubmit}
          />
          {serverErr && <h1 className='m-6'>{serverErr}</h1>}
          
          <CardList 
            searchRes={searchRes}
            onPortfolioCreate={onPortfolioCreate}
          />
        </div>
      </div>

      <div className='pt-42 bg-stone-200 w-2/5'>
      <h1 className='ml-14 font-semibold text-5xl text-start m-3 mb-10'>My Portfolio</h1>
      <ListPortfolio
        portfolioVals={portfolioVals}
        onPortfolioDelete={onPortfolioDelete}
      />
      </div>

    </div>


    </>
  )
}

export default App
