import { useState } from "react";
import { AddTokenModal } from "./AddTokenModal";
import { Plus } from "./icons/Plus";
import { Refresh } from "./icons/Refresh";
import { Star } from "./icons/Star";
import PortfolioTable from "./PortfolioTable";
import { Button } from "./ui/button";
import { useCoinGecko } from "@/hooks/useCoinGecko";

export const WatchList = () => {
  const [openAddtokenModal, setOpenAddtokenModal] = useState(false);
  const { refreshCoins } = useCoinGecko();
  return (
    <div className="flex flex-col gap-[16px]">
      <AddTokenModal
        open={openAddtokenModal}
        onOpenChange={setOpenAddtokenModal}
      />
      {/* buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[5px]">
          <Star className="text-[20px] h-[20px]" />
          <span className="text-[#F4F4F5] text-[20px] lg:text-[24px] font-[500]">
            Watchlist
          </span>
        </div>

        <div className="flex items-center gap-[20px]">
          <Button
            className="flex justify-center items-center gap-[5px] bg-[var(--surface-bg)] hover:bg-[var(--surface-bg-hover)] rounded-[6px]"
            onClick={() => refreshCoins()}
          >
            <Refresh /> <span className="hidden lg:block">Refresh Prices</span>
          </Button>
          <Button
            onClick={() => setOpenAddtokenModal(true)}
            className="h-[36px] flex justify-center items-center gap-[5px] bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-black rounded-[6px]"
          >
            <Plus /> <span className="text-[15px]">Add Token</span>
          </Button>
        </div>
      </div>
      {/* table */}
      <PortfolioTable />
    </div>
  );
};
