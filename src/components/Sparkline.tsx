import { LineChart, Line, ResponsiveContainer } from "recharts"

type SparklineProps = {
  data: number[] // last 7 days prices
}

export function Sparkline({ data }: SparklineProps) {
  
  const chartData = data.map((value, i) => ({ day: i, price: value }))

  // check if stock went up or down checking if last > first
  const isUp = data[data.length - 1] >= data[0]

  return (
    <div className="h-12 w-32">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="price"
            stroke={isUp ? "green" : "red"} // green/red
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
