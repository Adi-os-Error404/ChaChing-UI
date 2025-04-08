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
    thumb: string;
    small: string;
    large: string;
  };
  description: {
    en: string;
  };
  public_notice: string;
  market_cap_rank: number;
  hashing_algorithm: string | null;
  block_time_in_minutes: number;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_data: {
    current_price: {
      usd: number;
    };
    ath: {
      usd: number;
    };
    atl: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
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
