export interface Token {
  id: string;
  name: string;
  image:string;
  slug: string;
  price: number;
  change24h: number;
  price7d: number[];
  holding: number;
  value: number;
  fill: string;
  updating: boolean;
}

export interface PortfolioState {
  tokens: Token[];
}
export type TokenInput = Omit<Token, "holding" | "value" | "fill" | "updating">;
