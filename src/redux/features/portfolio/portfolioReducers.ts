import type { PayloadAction } from "@reduxjs/toolkit";
import type { PortfolioState, TokenInput } from "./portfolioTypes";

// helper to generate unique color per slug
export function generateColorFromSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

export const portfolioReducers = {
  setTokens: (
    state: PortfolioState,
    action: PayloadAction<PortfolioState["tokens"]>
  ) => {
    state.tokens = action.payload;
  },

  addTokens: (state: PortfolioState, action: PayloadAction<TokenInput[]>) => {
    const filteredTokens = action.payload.filter(
      ({ id }) => !state.tokens.find((t) => t.id === id)
    );

    const tokens = filteredTokens.map(
      ({ id, name, slug, price, change24h, price7d, image }) => {
        const value = 0;
        const fill = generateColorFromSlug(slug);
        return {
          id,
          name,
          slug,
          price,
          change24h,
          price7d,
          holding: 0,
          value,
          fill,
          image,
          updating: false,
        };
      }
    );

    state.tokens.push(...tokens);
    localStorage.setItem("tokens", JSON.stringify(state.tokens));
  },

  updateToken: (
    state: PortfolioState,
    action: PayloadAction<{
      id: string;
      holding?: number;
      updating?: boolean;
    }>
  ) => {
    const payload = action.payload;
    const token = state.tokens.find((t) => t.id === action.payload.id);
    if (token) {
      if (payload.holding !== undefined) {
        token.holding = payload.holding;
        token.value = token.price * token.holding;
      }
      if (payload.updating !== undefined) token.updating = payload.updating;
    }
    localStorage.setItem("tokens", JSON.stringify(state.tokens));
  },

  removeToken: (
    state: PortfolioState,
    action: PayloadAction<{
      id: string;
    }>
  ) => {
    state.tokens = state.tokens.filter((t) => t.id !== action.payload.id);
    localStorage.setItem("tokens", JSON.stringify(state.tokens));
  },
};
