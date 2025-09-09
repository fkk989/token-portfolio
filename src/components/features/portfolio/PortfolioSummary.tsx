import { useDispatch, useSelector } from "react-redux";
import { DesktopDonutChart, MobileDonutChart } from "../../charts/DonutChart";
import type { RootState } from "../../../redux/store";
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
    <div className="w-full  h-full lg:h-[30vh] flex max-sm:flex-col justify-between items-center  bg-[var(--surface-bg)] rounded-[12px] p-[24px]">
      {/* right side */}
      <div className="w-full lg:w-[50%] h-fit lg:h-full flex flex-col lg:justify-between max-sm:gap-[20px]">
        <div className="flex flex-col max-sm:gap-[20px]">
          <h2 className="text-[var(--text-secondary)]">Portfolio Total</h2>
          <div className="text-[#F4F4F5] text-3xl lg:text-[56px] font-[500]">
            ${totalPortfolioValue.toFixed(2)}
          </div>
        </div>
        <p className="text-[12px] text-[var(--text-secondary)]">
          Last updated: 3:42:12 PM
        </p>
      </div>
      {/* left side */}
      <div className="w-full lg:w-[50%] h-full flex flex-col ">
        <h2 className="text-[var(--text-secondary)]">Portfolio Total</h2>
        {tokens.length && totalPortfolioValue ? (
          <>
            <DesktopDonutChart data={tokens} />
            <MobileDonutChart data={tokens} /></>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
