import { CommentDetails } from "./Comment";

export type CoinFullDetails = {
  id: string;
  name: string;
  symbol: string;
  image: Image;
  market_cap_rank: number;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_data: MarketData;
  comments: CommentDetails[];
};

export type PortfolioCoinDetails = {
  coinId: string;
  name: string;
  symbol: string;
  imgUrl: string;
};

interface MarketData {
  current_price: {
    usd: number;
  };
  ath: {
    usd: number;
  };
  atl: {
    usd: number;
  };
  high_24h: {
    usd: number;
  };
  low_24h: {
    usd: number;
  };
  market_cap: {
    usd: number;
  };
  total_supply: number;
  max_supply: number;
  circulating_supply: number;
}

interface Image {
  thumb: string;
  small: string;
  large: string;
}
