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
  name: string;
  symbol: string;
  image: string;
  description: string;
  currentPriceUSD: number;
  marketCapUSD: number;
  rank: number;
  totalVolumeUSD: number;
  priceChange24h: number;
  high24h: number;
  low24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  athUSD: number;
  atlUSD: number;
  homepage: string;
  whitepaper: string | null;
}
