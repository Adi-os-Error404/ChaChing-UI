export type ArbitrageDetails = {
  tradeSteps: TradeStep[];
  rateProduct: number;
  profitPercentage: number;
};

export type TradeStep = {
  from: string;
  to: string;
  rate: number;
  fromImg: string;
};
