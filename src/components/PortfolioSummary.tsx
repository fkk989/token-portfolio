import DonutChart from "./DonutChart";

export const PortfolioSummary = () => {
  return (
    <div className="w-full h-[30vh] flex justify-between items-center  bg-[var(--surface-bg)] rounded-[12px] p-[24px]">
      {/* right side */}
      <div className="w-[50%] h-full flex flex-col justify-between">
        <div className="flex flex-col">
          <h2 className="text-[var(--text-secondary)]">Portfolio Total</h2>
          <div className="text-[#F4F4F5] text-[56px] font-[500]">
            $10,275.08
          </div>
        </div>
        <p className="text-[12px] text-[var(--text-secondary)]">
          Last updated: 3:42:12 PM
        </p>
      </div>
      {/* left side */}
      <div className="w-[50%] h-full flex flex-col">
        <h2 className="text-[var(--text-secondary)]">Portfolio Total</h2>
        <DonutChart />
      </div>
    </div>
  );
};
