import type { PortfolioState } from "@/redux/features/portfolio/portfolioTypes";
import { useEffect, useRef, useState } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  type TooltipProps,
} from "recharts";

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
const CustomLegend = (props: any) => {
  const { payload } = props as { payload: [] };

  return (
    <ul
      className="w-full max-sm:max-h-[200px] fade-in1s lg:fade-in max-sm:mt-[20px]"
      style={{ listStyle: "none", margin: 0, padding: 0 }}
    >
      {payload
        .filter((entry: any) => entry.payload.value)
        .map((entry: any, index: number) => (
          <li
            key={`item-${index}`}
            style={{
              color: entry.color,
            }}
            className=" mt-[20px] text-[16px] font-[500] flex items-center justify-between"
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

interface DonutChartProp {
  data: PortfolioState["tokens"];
}

export const DesktopDonutChart: React.FC<DonutChartProp> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pieWidth, setPieWidth] = useState<number>(0);

  useEffect(() => {
    console.log("pieWidth: ", pieWidth);
  }, [pieWidth]);

  return (
    <div
      ref={containerRef}
      className="hidden relative lg:flex items-center justify-center w-full h-[400px]"
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
              }, 2300);
            }}
          />
          {pieWidth && (
            <Legend
              wrapperStyle={{
                width: `calc(100% - ${pieWidth}px)`,
                height: "100%",
                position: "absolute",
                right: 0,
                paddingLeft: "25px",
                overflow: "scroll",
              }}
              className="w-full"
              verticalAlign="middle"
              content={(props) => {
                return <CustomLegend {...props} />;
              }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const MobileDonutChart: React.FC<DonutChartProp> = ({ data }) => {

  return (
      <ResponsiveContainer
        width="100%"
        height="90%"
        className={"relative flex justify-start lg:hidden"}
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
          />

          <Legend
            wrapperStyle={{
              width: `100%`,
              height: "55%",
              position: "absolute",
              right: 0,
              overflow: "scroll",
            }}
            className="w-full"
            verticalAlign="bottom"
            content={(props) => {
              return <CustomLegend {...props} />;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
  );
};
