import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionTooltipProps {
  children: React.ReactNode;
  label: string;
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left";
}

export const ActionTooltip = ({
  children,
  label,
  align = "center",
  side = "top",
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent sideOffset={15} align={align} side={side}>
          <p className="capitalize">{label.toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
