import { cn } from "@/lib/utils";
import React from "react";

const AnswerBorder = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-lg shadow-lg border px-8 py-4 space-y-4 border-background",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnswerBorder;
