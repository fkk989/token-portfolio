import MainIcon from "../icons/NavIcon";
import { CustomConnectButton } from './CustomConnectButton';

export const Header = () => {
  return (
    <div className="w-full h-[56px] flex justify-between items-center px-[12px] py-[20px]">
      <div className="flex items-center gap-[10px] lg:gap-[20px]">
        <MainIcon />
        <h1 className="text-[20px] font-[600] text-[var(--text-primary)]">
          Token Portfolio
        </h1>
      </div>

      <CustomConnectButton />

    </div>
  );
};
