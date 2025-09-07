import { createSlice } from "@reduxjs/toolkit";
import type { PortfolioState } from "./portfolioTypes";
import { portfolioReducers } from "./portfolioReducers";

// dummy state
const initialTokens: PortfolioState["tokens"] = [
  {
    id: "bitcoing",
    name: "Bitcoin",
    slug: "BTC",
    price: 43250.67,
    change24h: +2.3,
    price7d: [41000, 41500, 42000, 42500, 43000, 42800, 43250],
    holding: 0.05,
    value: 0.05 * 43250.67,
    fill: "#22c55e",
    updating: false,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    slug: "ETH",
    price: 3250.12,
    change24h: -1.8,
    price7d: [3400, 3380, 3350, 3300, 3280, 3260, 3250],
    holding: 1.2,
    value: 1.2 * 3250.12,
    fill: "#a78bfa",
    updating: false,
  },
  {
    id: "solona,",
    name: "Solana",
    slug: "SOL",
    price: 152.45,
    change24h: +4.1,
    price7d: [140, 145, 148, 150, 149, 151, 152],
    holding: 10,
    value: 10 * 152.45,
    fill: "#60a5fa",
    updating: false,
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    slug: "DOGE",
    price: 0.082,
    change24h: +0.6,
    price7d: [0.075, 0.076, 0.078, 0.08, 0.081, 0.082, 0.082],
    holding: 5000,
    value: 5000 * 0.082,
    fill: "#06b6d4",
    updating: false,
  },
  // --- more dummy tokens ---
  ...Array.from({ length: 46 }, (_, i) => {
    const id = i + 5;
    const price = Math.random() * 500 + 1; // random price
    const holding = Math.floor(Math.random() * 20) + 1;
    const change24h = +(Math.random() * 10 - 5).toFixed(2); // between -5% and +5%
    const slug = `TOK${id}`;
    return {
      id: `token-${id}`,
      name: `Token ${id}`,
      slug,
      price,
      change24h,
      price7d: Array.from(
        { length: 7 },
        () => +(price * (0.9 + Math.random() * 0.2)).toFixed(2)
      ),
      holding,
      value: +(holding * price).toFixed(2),
      fill: ["#22c55e", "#a78bfa", "#60a5fa", "#06b6d4", "#f59e0b"][id % 5],
      updating: false,
    };
  }),
];

const initialState: PortfolioState = {
  tokens: initialTokens,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: portfolioReducers,
});

export const { addToken, updateToken } = portfolioSlice.actions;
export default portfolioSlice.reducer;
