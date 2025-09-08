import type { Icons } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

export const Plus: React.FC<Icons> = (props) => {
  return (
    <svg
      className={cn("w-[15px] h-[16px]", props.className)}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 2.99997V13"
        stroke="#18181B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.5 8H12.5"
        stroke="#18181B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
