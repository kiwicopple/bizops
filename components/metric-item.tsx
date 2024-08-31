import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export const MetricItem = ({
  label,
  value,
  tooltip,
  explanation,
  onHover,
  onLeave,
}: {
  label: string;
  value: string;
  tooltip: string;
  explanation: string;
  onHover: () => void;
  onLeave: () => void;
}) => (
  <li
    className="flex items-center justify-between text-sm hover:bg-gray-200 hover:cursor-default"
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <span className="flex items-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <InfoCircledIcon className="h-4 w-4 mr-1 text-gray-500 cursor-help" />
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <p className="font-semibold">{tooltip}</p>
            <p className="text-sm text-gray-500">{explanation}</p>
          </div>
        </HoverCardContent>
      </HoverCard>
      {label}:
    </span>
    <span className="">{value}</span>
  </li>
);
