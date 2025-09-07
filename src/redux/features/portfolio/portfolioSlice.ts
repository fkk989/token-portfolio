import { createSlice } from "@reduxjs/toolkit";
import type { PortfolioState } from "./portfolioTypes";
import { portfolioReducers } from "./portfolioReducers";

const initialState: PortfolioState = {
  tokens: [],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: portfolioReducers,
});

export const {setTokens, addTokens, updateToken, removeToken } = portfolioSlice.actions;
export default portfolioSlice.reducer;
