"use client";

import { useEffect, useRef, useState } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  type TooltipProps,
} from "recharts";

const data = [
  { name: "Bitcoin (BTC)", value: 400, fill: "#22c55e" }, // green
  { name: "Ethereum (ETH)", value: 300, fill: "#a78bfa" }, // purple
  { name: "Solana (SOL)", value: 200, fill: "#60a5fa" }, // blue
  { name: "Dogecoin (DOGE)", value: 278, fill: "#06b6d4" }, // cyan
  { name: "Solana (SOL)", value: 189, fill: "#f97316" }, // orange
  { name: "Solana (SOL)", value: 100, fill: "#f43f5e" }, // red
];

const CustomTooltip = ({ active, payload }: TooltipProps<any, any>) => {
  if (!active || !payload?.length) return null;

  const item = payload[0];

  return (
    <div className="bg-[var(--body-bg)] text-white px-3 py-2 rounded-lg shadow-lg border border-gray-700">
      <p className="font-semibold text-sm">{item.name}</p>
      <p className="text-[12px] mt-1">
        <span
          className="inline-block w-2.5 h-2.5 rounded-full mr-2"
          style={{ backgroundColor: item.payload.fill }}
        />
        {item.value.toLocaleString()}
      </p>
    </div>
  );
};

// Custom legend to color match labels
const renderLegend = (props: any) => {
  const { payload } = props as { payload: [] };

  return (
    <ul
      className="w-full fade-in"
      style={{ listStyle: "none", margin: 0, padding: 0 }}
    >
      {payload.map((entry: any, index: number) => (
        <li
          key={`item-${index}`}
          style={{
            color: entry.color,
          }}
          className="mb-[8px] text-[16px] font-[500] flex items-center justify-between"
        >
          <span>{entry.value}</span>{" "}
          <span className="text-[var(--text-secondary)]">
            {(entry.payload.percent * 100).toFixed(2)}%
          </span>
        </li>
      ))}
    </ul>
  );
};

export default function DonutChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pieWidth, setPieWidth] = useState<number>(0);

  useEffect(() => {
    console.log("pieWidth: ", pieWidth);
  }, [pieWidth]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-[400px]"
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
        className={"relative flex justify-start"}
      >
        <PieChart className="w-[40%]">
          <Tooltip content={CustomTooltip} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="40%"
            outerRadius="100%"
            stroke="#fff"
            paddingAngle={1}
            cx={100}
            onAnimationEnd={() => {
              setTimeout(() => {
                const target = containerRef.current?.querySelector(
                  ".recharts-pie"
                ) as HTMLElement | null;

                if (target) {
                  const resizeObserver = new ResizeObserver((entries) => {
                    for (let entry of entries) {
                      setPieWidth(entry.contentRect.width);
                    }
                  });
                  resizeObserver.observe(target);
                }
              }, 3000);
            }}
          />
          {pieWidth && (
            <Legend
              wrapperStyle={{
                width: `calc(100% - ${pieWidth}px)`,
                position: "absolute",
                right: 0,
                paddingLeft: "25px",
              }}
              className="w-full md:hidden"
              verticalAlign="middle"
              content={renderLegend}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
