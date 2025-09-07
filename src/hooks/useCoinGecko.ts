import { useState, useCallback } from "react";
import cg_api from "@/lib/apis/coin_gecko";
import { debounce } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import type {
  PortfolioState,
  TokenInput,
} from "@/redux/features/portfolio/portfolioTypes";
import {
  addTokens,
  setTokens,
} from "@/redux/features/portfolio/portfolioSlice";
import type { RootState } from "@/redux/store";

interface Coin {
  id: string;
  image: string;
  slug: string;
  name: string;
}

export function useCoinGecko() {
  const [searchedTokens, setSearchedTokens] = useState<Coin[]>([]);
  const [trendingToken, setTrendingTokens] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tokens = useSelector((state: RootState) => state.portfolio.tokens);
  const dispatch = useDispatch();

  const searchCoins = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) return;
      try {
        setLoading(true);
        setError(null);

        const res = await cg_api.get(`/search`, { params: { query } });

        const coins =
          res.data?.coins?.map((c: any) => ({
            id: c.id,
            name: c.name,
            slug: c.symbol,
            image: c.thumb || c.large,
          })) || [];
        console.log("Searched coins: ", coins);
        setSearchedTokens(coins);
      } catch (err: any) {
        setError(err.message || "Failed to search coins");
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );
  const getTrendingCoins = useCallback(async () => {
    try {
      console.log("get treding coinds");
      setLoading(true);
      setError(null);

      const res = await cg_api.get(`/search/trending`);

      const coins =
        res.data?.coins?.map((c: any) => ({
          id: c.item.id,
          name: c.item.name,
          slug: c.item.symbol,
          image: c.item.small || c.item.large,
        })) || [];

      setTrendingTokens(coins);
    } catch (err: any) {
      setError(err.message || "Failed to fetch trending coins");
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshCoins = useCallback(async () => {
    setLoading(true);
    const ids = tokens.map((token) => token.id);
    if (!ids.length) return;
    try {
      setError(null);
      const res = await cg_api.get(`/coins/markets`, {
        params: {
          vs_currency: "usd",
          ids: ids.join(","),
          sparkline: true,
        },
      });
      console.log(res.data);
      const structuredTokens: PortfolioState["tokens"] =
        tokens.map((t) => {
          const currentToken = res.data.find((c: any) => c.id === t.id);

          if (currentToken) {
            return {
              ...t,
              name: currentToken.name,
              slug: currentToken.symbol.toUpperCase(),
              price: currentToken.current_price,
              change24h: currentToken.price_change_percentage_24h,
              price7d: currentToken.sparkline_in_7d?.price || [],
              image: currentToken.image,
              value: t.holding * currentToken.current_price,
              updating: false,
            };
          }

          return {
            ...t,
            updating: false,
          };
        }) || [];

      console.log("Refreshed tokens: ", structuredTokens);

      dispatch(setTokens(structuredTokens));
    } catch (err: any) {
      setError(err.message || "Failed to refresh coins");
      console.log("Failed to refresh coins: ", err);
    } finally {
      setLoading(false);
    }
  }, [tokens]);

  const addSelectedTokenToState = useCallback(
    async (ids: string[]) => {
      if (!ids.length) return;

      try {
        const res = await cg_api.get(`/coins/markets`, {
          params: {
            vs_currency: "usd",
            ids: ids.join(","),
            sparkline: true,
          },
        });

        console.log("market data response: ", res.data);

        const tokens: TokenInput[] =
          res.data?.map(
            (c: any): TokenInput => ({
              id: c.id,
              name: c.name,
              slug: c.symbol.toUpperCase(),
              price: c.current_price,
              change24h: c.price_change_percentage_24h,
              price7d: c.sparkline_in_7d?.price || [],
              image: c.image,
            })
          ) || [];

        console.log("tokens to : ", tokens);

        dispatch(addTokens(tokens));
      } catch (err: any) {
        console.error("Failed to fetch tokens", err.message);
      }
    },
    [dispatch]
  );
  return {
    searchedTokens,
    trendingToken,
    loading,
    error,
    searchCoins,
    refreshCoins,
    getTrendingCoins,
    setSearchedTokens,
    addSelectedTokenToState,
  };
}
