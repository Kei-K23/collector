"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/store/modal-store";

const CreateForm = () => {
  const { onOpen } = useModalStore();

  return (
    <div>
      <Card
        onClick={() => onOpen("createForm")}
        className={cn(
          "group w-[150px] h-[150px] cursor-pointer flex justify-center items-center transition-all hover:border hover:border-purple-500"
        )}
      >
        <PlusIcon className="w-20 h-20 " />
      </Card>
      <p className="mt-2">Crate form</p>
    </div>
  );
};

export default CreateForm;
