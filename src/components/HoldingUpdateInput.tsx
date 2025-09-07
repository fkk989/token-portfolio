import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { PortfolioState } from "@/redux/features/portfolio/portfolioTypes";
import { useDispatch } from "react-redux";
import { updateToken } from "@/redux/features/portfolio/portfolioSlice";

export const HoldingUpdateInput = ({
  token,
}: {
  token: PortfolioState["tokens"][0];
}) => {
  const [holding, setHolding] = useState(token.holding);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-[12px]">
      <Input
        type="number"
        className="w-[109px] h-[32px] box-shadow-accent rounded-[6px]"
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value && !isNaN(value)) {
            setHolding(value);
          }
        }}
        autoFocus
      />
      <Button
        className="flex justify-center items-center h-[32px] gap-[5px] bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] rounded-[6px] text-black"
        onClick={() => {
          dispatch(updateToken({ id: token.id, holding, updating: false }));
        }}
      >
        Save
      </Button>
    </div>
  );
};
