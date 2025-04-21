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

export interface MarketChartPoint {
  timestamp: number;
  price: number;
}
