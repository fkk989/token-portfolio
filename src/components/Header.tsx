import { Wallet } from "./Icons/Wallet";
import MainIcon from "./Icons/NavIcon";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <div className="w-full h-[56px] flex justify-between items-center px-[12px]">
      <div className="flex items-center gap-[20px]">
        <MainIcon />
        <h1 className="text-[20px] font-[600] text-[var(--text-primary)]">
          Token Portfolio
        </h1>
      </div>
      <Button className="flex justify-center items-center gap-[5px] bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] rounded-full text-black">
        <Wallet /> <span>Connect Wallet</span>
      </Button>
    </div>
  );
};
