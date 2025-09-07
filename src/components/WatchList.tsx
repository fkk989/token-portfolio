import { Plus } from "./Icons/Plus";
import { Refresh } from "./Icons/Refresh";
import { Star } from "./Icons/Star";
import PortfolioTable from "./PortfolioTable";
import { Button } from "./ui/button";

export const WatchList = () => {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[5px]">
          <Star />
          <span className="text-[#F4F4F5] text-[24px] font-[500]">
            Watchlist
          </span>
        </div>

        <div className="flex items-center gap-[20px]">
          <Button className="flex justify-center items-center gap-[5px] bg-[var(--surface-bg)] hover:bg-[var(--surface-bg-hover)] rounded-[6px] ">
            <Refresh /> <span>Refresh Prices</span>
          </Button>
          <Button className="flex justify-center items-center gap-[5px] bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-black rounded-[6px]">
            <Plus /> <span>Add Token</span>
          </Button>
        </div>
      </div>
      {/* table */}
      <PortfolioTable />
    </div>
  );
};
