"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricItem } from "./metric-item";
import {
  calculateMovingRange,
  calculateAverage,
  calculateControlLimits,
  checkBusinessRules,
} from "@/lib/xmrUtils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { InfoCircledIcon } from "@radix-ui/react-icons";

// XmR Chart Component
export function WbrChart({
  data,
  title,
  yAxisLabel,
}: {
  data: { date: string; value: number }[];
  title: string;
  yAxisLabel: string;
}) {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const [hoveredRule, setHoveredRule] = useState<string | null>(null);

  const mrData = useMemo(() => calculateMovingRange(data), [data]);
  const average = useMemo(() => calculateAverage(data, "value"), [data]);
  const mrAverage = useMemo(() => calculateAverage(mrData, "mr"), [mrData]);

  const handleMetricHover = (metric: string | null) => {
    setHoveredMetric(metric);
  };

  const handleRuleHover = useCallback((rule: string | null) => {
    setHoveredRule(rule);
  }, []);

  const getLineStyle = useCallback(
    (metric: string) => {
      if (hoveredRule === "Process Limit Rule") {
        return {
          stroke: "#FF0000",
          strokeWidth: 3,
        };
      }
      if (hoveredRule === "Quartile Limit Rule" && metric === "value") {
        return {
          stroke: "#FF0000",
          strokeWidth: 3,
        };
      }
      if (hoveredRule === "Runs of Eight" && metric === "value") {
        return {
          stroke: "#FF0000",
          strokeWidth: 3,
        };
      }
      return {
        stroke: hoveredMetric === metric ? "#f59e0b" : "#2563eb",
        strokeWidth: hoveredMetric === metric ? 10 : 3,
      };
    },
    [hoveredMetric, hoveredRule]
  );

  const { UNPL, LNPL } = useMemo(
    () => calculateControlLimits(average, mrAverage),
    [average, mrAverage]
  );

  const MR_UCL = useMemo(() => 3.268 * mrAverage, [mrAverage]);

  const businessRules = useMemo(
    () => checkBusinessRules(data, average, UNPL, LNPL, mrData, MR_UCL),
    [data, average, UNPL, LNPL, mrData, MR_UCL]
  );

  const ruleDescriptions = {
    "Process Limit Rule":
      "If a point lies outside the limit lines (the blue lines), on either the X chart or the MR chart, something unusual is going on.",
    "Quartile Limit Rule":
      "If you have a run of three out of four successive points that is closer to the limit lines than the centre line, then this is a moderate source of exceptional variation.",
    "Runs of Eight":
      "If you have eight data points in a row on one side of the average line, this is a weak source of special variation.",
  };

  const mrDataForChart = useMemo(() => mrData.slice(1), [mrData]);

  return (
    <div className="grid grid-cols-4 border-b border-gray-800">
      <div className="col-span-1 p-4">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <MetricItem
              label="Average"
              value={average.toFixed(2)}
              tooltip="The mean value of all data points"
              explanation="This is the typical value you'd expect to see. It's like the 'normal' level for this metric."
              onHover={() => handleMetricHover("average")}
              onLeave={() => handleMetricHover(null)}
            />
            <MetricItem
              label="Upper NPL"
              value={UNPL.toFixed(2)}
              tooltip="Upper Natural Process Limit: Average + 2.66 * Average Moving Range"
              explanation="This is the highest value we'd normally expect to see. If a point goes above this, it might be worth investigating."
              onHover={() => handleMetricHover("UNPL")}
              onLeave={() => handleMetricHover(null)}
            />
            <MetricItem
              label="Lower NPL"
              value={LNPL.toFixed(2)}
              tooltip="Lower Natural Process Limit: Average - 2.66 * Average Moving Range"
              explanation="This is the lowest value we'd normally expect to see. If a point goes below this, it might be worth investigating."
              onHover={() => handleMetricHover("LNPL")}
              onLeave={() => handleMetricHover(null)}
            />
            <MetricItem
              label="MR Average"
              value={mrAverage.toFixed(2)}
              tooltip="Average of the Moving Range values"
              explanation="This shows how much the metric typically changes from one point to the next. It helps us understand the usual variability."
              onHover={() => handleMetricHover("mrAverage")}
              onLeave={() => handleMetricHover(null)}
            />
            <MetricItem
              label="MR UCL"
              value={MR_UCL.toFixed(2)}
              tooltip="Upper Control Limit for Moving Range: 3.268 * MR Average"
              explanation="This is the largest change we'd normally expect to see between two consecutive points. If the change is bigger than this, it might indicate an unusual shift."
              onHover={() => handleMetricHover("MR_UCL")}
              onLeave={() => handleMetricHover(null)}
            />
          </ul>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Business Rules:</h3>
            {businessRules.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {businessRules.map((rule, index) => (
                  <li key={index} className="flex items-center">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <InfoCircledIcon className="h-4 w-4 mr-1 text-gray-500 cursor-help" />
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p className="text-sm">
                          {
                            ruleDescriptions[
                              rule as keyof typeof ruleDescriptions
                            ]
                          }
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                    <span
                      onMouseEnter={() => handleRuleHover(rule)}
                      onMouseLeave={() => handleRuleHover(null)}
                      className="cursor-pointer"
                    >
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">Business as usual.</p>
            )}
          </div>
        </CardContent>
      </div>

      <div className="col-span-3 border-l border-gray-800 p-4">
        <div className="h-[300px] mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="date" stroke="#e5e5e5" />
              <YAxis
                stroke="#e5e5e5"
                label={{
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#e5e5e5" },
                }}
              />
              <RechartsTooltip />
              <ReferenceLine
                y={average}
                stroke={hoveredMetric === "average" ? "#FF0000" : "#000"}
                strokeWidth={hoveredMetric === "average" ? 2 : 1}
                strokeDasharray="3 3"
              />
              <ReferenceLine
                y={UNPL}
                stroke={hoveredMetric === "UNPL" ? "#FF0000" : "#666"}
                strokeWidth={hoveredMetric === "UNPL" ? 2 : 1}
                strokeDasharray="3 3"
              />
              <ReferenceLine
                y={LNPL}
                stroke={hoveredMetric === "LNPL" ? "#FF0000" : "#666"}
                strokeWidth={hoveredMetric === "LNPL" ? 2 : 1}
                strokeDasharray="3 3"
              />
              <Line
                type="monotone"
                dataKey="value"
                {...getLineStyle("value")}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mrDataForChart}
              margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="date" stroke="#e5e5e5" />
              <YAxis
                stroke="#e5e5e5"
                domain={[
                  0,
                  (dataMax: number) => Math.max(dataMax, Math.ceil(MR_UCL)),
                ]}
                label={{
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#e5e5e5" },
                }}
              />
              <RechartsTooltip />
              <ReferenceLine
                y={mrAverage}
                stroke={hoveredMetric === "mrAverage" ? "#FF0000" : "#333"}
                strokeWidth={hoveredMetric === "mrAverage" ? 2 : 1}
                strokeDasharray="3 3"
              />
              <ReferenceLine
                y={MR_UCL}
                stroke={hoveredMetric === "MR_UCL" ? "#FF0000" : "#999"}
                strokeWidth={hoveredMetric === "MR_UCL" ? 2 : 1}
                strokeDasharray="3 3"
              >
                <Label
                  //   value={`MR UCL: ${MR_UCL.toFixed(2)}`}
                  position="right"
                />
              </ReferenceLine>
              <Line
                type="monotone"
                dataKey="mr"
                {...getLineStyle("mr")}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
