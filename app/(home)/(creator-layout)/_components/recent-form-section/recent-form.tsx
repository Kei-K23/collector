"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookText, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface RecentFormProps {
  title: string;
  createdAt: Date;
  formId: string;
}

const RecentForm = ({ title, createdAt, formId }: RecentFormProps) => {
  return (
    <Link
      href={`/forms/${formId}`}
      className={cn(
        "relative bg-background group w-[200px] h-[220px] border-[1.5px] rounded-lg border-slate-300 dark:border-slate-700 cursor-pointer flex flex-col justify-center items-center transition-all hover:border-purple-500  "
      )}
    >
      <div className="w-full flex items-center justify-center">
        <BookText className="w-8 h-8" />
      </div>
      <h3 className="mt-4">{title}</h3>
      <p className="text-muted-foreground">
        created: {formatDistanceToNow(new Date(createdAt))}
      </p>
    </Link>
  );
};

export default RecentForm;
