"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookText, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface RecentFormProps {
  title: string;
  createdAt: Date;
  formId: string;
}

const RecentForm = ({ title, createdAt, formId }: RecentFormProps) => {
  return (
    <div>
      <Card
        className={cn(
          " group w-[200px] h-[220px] cursor-pointer flex justify-center items-center transition-all hover:border hover:border-purple-500"
        )}
      >
        <CardContent className="p-2">
          <div className="w-full flex items-center justify-center">
            <BookText className="w-8 h-8" />
          </div>
          <h3 className="mt-4">{title}</h3>
          <p className="text-muted-foreground">
            created: {formatDistanceToNow(new Date(createdAt))}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentForm;
