export interface CoinSearch {
  id: string;
  symbol: string;
  name: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export interface PortCoin {
  id: string;
  symbol: string;
  name: string;
  imgLink: string;
}

export interface CoinDetails {
  id: string;
  name: string;
  symbol: string;
  image: {
    thumb: string | null;
    small: string | null;
    large: string | null;
  };
  market_cap_rank: number | null;
  genesis_date: string | null;
  sentiment_votes_up_percentage: number | null;
  sentiment_votes_down_percentage: number | null;
  watchlist_portfolio_users: number | null;
  market_data: {
    current_price: {
      usd: number | null;
    };
    ath: {
      usd: number | null;
    };
    atl: {
      usd: number | null;
    };
    market_cap: {
      usd: number | null;
    };
    high_24h: {
      usd: number | null;
    };
    low_24h: {
      usd: number | null;
    };
    total_supply: number | null;
    max_supply: number | null;
    circulating_supply: number | null;
  };

  links: {
    homepage: Array<string> | null;
    whitepaper: string | null;
    subreddit_url: string | null;
  };
}

export interface MarketChartPoint {
  timestamp: number;
  price: number;
}
