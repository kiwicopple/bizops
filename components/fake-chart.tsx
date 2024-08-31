"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Two interactive line charts";

const chartData = [
  { date: "2024-04-01", variance: 222, metric: 150 },
  { date: "2024-04-02", variance: 97, metric: 180 },
  { date: "2024-04-03", variance: 167, metric: 120 },
  { date: "2024-04-04", variance: 242, metric: 260 },
  { date: "2024-04-05", variance: 373, metric: 290 },
  { date: "2024-04-06", variance: 301, metric: 340 },
  { date: "2024-04-07", variance: 245, metric: 180 },
  { date: "2024-04-08", variance: 409, metric: 320 },
  { date: "2024-04-09", variance: 59, metric: 110 },
  { date: "2024-04-10", variance: 261, metric: 190 },
  { date: "2024-04-11", variance: 327, metric: 350 },
  { date: "2024-04-12", variance: 292, metric: 210 },
  { date: "2024-04-13", variance: 342, metric: 380 },
  { date: "2024-04-14", variance: 137, metric: 220 },
  { date: "2024-04-15", variance: 120, metric: 170 },
  { date: "2024-04-16", variance: 138, metric: 190 },
  { date: "2024-04-17", variance: 446, metric: 360 },
  { date: "2024-04-18", variance: 364, metric: 410 },
  { date: "2024-04-19", variance: 243, metric: 180 },
  { date: "2024-04-20", variance: 89, metric: 150 },
  { date: "2024-04-21", variance: 137, metric: 200 },
  { date: "2024-04-22", variance: 224, metric: 170 },
  { date: "2024-04-23", variance: 138, metric: 230 },
  { date: "2024-04-24", variance: 387, metric: 290 },
  { date: "2024-04-25", variance: 215, metric: 250 },
  { date: "2024-04-26", variance: 75, metric: 130 },
  { date: "2024-04-27", variance: 383, metric: 420 },
  { date: "2024-04-28", variance: 122, metric: 180 },
  { date: "2024-04-29", variance: 315, metric: 240 },
  { date: "2024-04-30", variance: 454, metric: 380 },
  { date: "2024-05-01", variance: 165, metric: 220 },
  { date: "2024-05-02", variance: 293, metric: 310 },
  { date: "2024-05-03", variance: 247, metric: 190 },
  { date: "2024-05-04", variance: 385, metric: 420 },
  { date: "2024-05-05", variance: 481, metric: 390 },
  { date: "2024-05-06", variance: 498, metric: 520 },
  { date: "2024-05-07", variance: 388, metric: 300 },
  { date: "2024-05-08", variance: 149, metric: 210 },
  { date: "2024-05-09", variance: 227, metric: 180 },
  { date: "2024-05-10", variance: 293, metric: 330 },
  { date: "2024-05-11", variance: 335, metric: 270 },
  { date: "2024-05-12", variance: 197, metric: 240 },
  { date: "2024-05-13", variance: 197, metric: 160 },
  { date: "2024-05-14", variance: 448, metric: 490 },
  { date: "2024-05-15", variance: 473, metric: 380 },
  { date: "2024-05-16", variance: 338, metric: 400 },
  { date: "2024-05-17", variance: 499, metric: 420 },
  { date: "2024-05-18", variance: 315, metric: 350 },
  { date: "2024-05-19", variance: 235, metric: 180 },
  { date: "2024-05-20", variance: 177, metric: 230 },
  { date: "2024-05-21", variance: 82, metric: 140 },
  { date: "2024-05-22", variance: 81, metric: 120 },
  { date: "2024-05-23", variance: 252, metric: 290 },
  { date: "2024-05-24", variance: 294, metric: 220 },
  { date: "2024-05-25", variance: 201, metric: 250 },
  { date: "2024-05-26", variance: 213, metric: 170 },
  { date: "2024-05-27", variance: 420, metric: 460 },
  { date: "2024-05-28", variance: 233, metric: 190 },
  { date: "2024-05-29", variance: 78, metric: 130 },
  { date: "2024-05-30", variance: 340, metric: 280 },
  { date: "2024-05-31", variance: 178, metric: 230 },
  { date: "2024-06-01", variance: 178, metric: 200 },
  { date: "2024-06-02", variance: 470, metric: 410 },
  { date: "2024-06-03", variance: 103, metric: 160 },
  { date: "2024-06-04", variance: 439, metric: 380 },
  { date: "2024-06-05", variance: 88, metric: 140 },
  { date: "2024-06-06", variance: 294, metric: 250 },
  { date: "2024-06-07", variance: 323, metric: 370 },
  { date: "2024-06-08", variance: 385, metric: 320 },
  { date: "2024-06-09", variance: 438, metric: 480 },
  { date: "2024-06-10", variance: 155, metric: 200 },
  { date: "2024-06-11", variance: 92, metric: 150 },
  { date: "2024-06-12", variance: 492, metric: 420 },
  { date: "2024-06-13", variance: 81, metric: 130 },
  { date: "2024-06-14", variance: 426, metric: 380 },
  { date: "2024-06-15", variance: 307, metric: 350 },
  { date: "2024-06-16", variance: 371, metric: 310 },
  { date: "2024-06-17", variance: 475, metric: 520 },
  { date: "2024-06-18", variance: 107, metric: 170 },
  { date: "2024-06-19", variance: 341, metric: 290 },
  { date: "2024-06-20", variance: 408, metric: 450 },
  { date: "2024-06-21", variance: 169, metric: 210 },
  { date: "2024-06-22", variance: 317, metric: 270 },
  { date: "2024-06-23", variance: 480, metric: 530 },
  { date: "2024-06-24", variance: 132, metric: 180 },
  { date: "2024-06-25", variance: 141, metric: 190 },
  { date: "2024-06-26", variance: 434, metric: 380 },
  { date: "2024-06-27", variance: 448, metric: 490 },
  { date: "2024-06-28", variance: 149, metric: 200 },
  { date: "2024-06-29", variance: 103, metric: 160 },
  { date: "2024-06-30", variance: 446, metric: 400 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  variance: {
    label: "Variance",
    color: "hsl(var(--chart-2))",
  },
  metric: {
    label: "Metric",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function FakeChart() {
  const total = React.useMemo(
    () => ({
      variance: chartData.reduce((acc, curr) => acc + curr.variance, 0),
      metric: chartData.reduce((acc, curr) => acc + curr.metric, 0),
    }),
    []
  );

  return (
    <Card className="">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Page Views</CardTitle>
          <CardDescription>
            Total visitors for the last 3 months.
          </CardDescription>
        </div>
        <div className="flex">
          {["variance", "metric"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <div
                key={chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <div className="flex flex-col gap-4">
          {["variance", "metric"].map((chartType) => (
            <ChartContainer
              key={chartType}
              config={chartConfig}
              className="w-full h-[200px]" // Adjusted height here
            >
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                />
                <Line
                  dataKey={chartType}
                  type={chartType === "variance" ? "monotone" : "step"}
                  stroke={`var(--color-${chartType})`}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
