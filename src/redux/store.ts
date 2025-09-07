import { configureStore, combineReducers } from "@reduxjs/toolkit";
import portfolioReducer from "./features/portfolio/portfolioSlice";

const rootReducer = combineReducers({
  portfolio: portfolioReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
