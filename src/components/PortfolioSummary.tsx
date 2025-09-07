import { useDispatch, useSelector } from "react-redux";
import { DonutChart } from "./DonutChart";
import type { RootState } from "../redux/store";
import { useEffect } from "react";
import { setTokens } from "@/redux/features/portfolio/portfolioSlice";

export const PortfolioSummary = () => {
  const tokens = useSelector((state: RootState) => state.portfolio.tokens);
  const dispatch = useDispatch();
  const totalPortfolioValue = tokens.reduce((acc, curr) => acc + curr.value, 0);

  useEffect(() => {
    const tokens = localStorage.getItem("tokens");
    if (tokens) {
      dispatch(setTokens(JSON.parse(tokens)));
    }
  }, []);
  return (
    <div className="w-full h-[30vh] flex justify-between items-center  bg-[var(--surface-bg)] rounded-[12px] p-[24px]">
      {/* right side */}
      <div className="w-[50%] h-full flex flex-col justify-between">
        <div className="flex flex-col">
          <h2 className="text-[var(--text-secondary)]">Portfolio Total</h2>
          <div className="text-[#F4F4F5] text-[56px] font-[500]">
            ${totalPortfolioValue.toFixed(2)}
          </div>
        </div>
        <p className="text-[12px] text-[var(--text-secondary)]">
          Last updated: 3:42:12 PM
        </p>
      </div>
      {/* left side */}
      <div className="w-[50%] h-full flex flex-col">
        <h2 className="text-[var(--text-secondary)]">Portfolio Total</h2>
        {tokens.length && totalPortfolioValue ? (
          <DonutChart data={tokens} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
