import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Ellipsis } from "../../icons";
import { useDispatch } from "react-redux";
import {
  removeToken,
  updateToken,
} from "@/redux/features/portfolio/portfolioSlice";
import type { PortfolioState } from "@/redux/features/portfolio/portfolioTypes";

export function TokenActions({
  token,
}: {
  token: PortfolioState["tokens"][0];
}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeToken({ id: token.id }));
    setOpen(false);
  };

  const handleEdit = () => {
    dispatch(updateToken({ id: token.id, updating: true }));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent group">
          <Ellipsis className="hover:text-[var(--secondary-text)] group-hover:text-[var(--surface-bg)]" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="left"
        align="center"
        className="w-[142px] h-[72px] flex flex-col items-center justify-center bg-[var(--surface-bg)] border-b border-[var(--border-primary)] p-0"
      >
        <div
          className="w-full h-[50%] flex items-center gap-[8px] border-b border-[var(--border-primary)] pl-[5px] cursor-pointer hover:bg-[var(--surface-bg-hover)]"
          onClick={handleEdit}
        >
          <Pencil />
          <span className="text-[var(--text-secondary)]">Edit Holdings</span>
        </div>

        <div
          className="w-full h-[50%] flex items-center gap-[8px] pl-[5px] cursor-pointer hover:bg-[var(--surface-bg-hover)]"
          onClick={handleRemove}
        >
          <Trash />
          <span className="text-[#FDA4AF]">Remove</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
