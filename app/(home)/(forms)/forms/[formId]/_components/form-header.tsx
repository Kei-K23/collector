"use client";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/modal-store";
import { DetailFormData } from "@/type";
import { Pen } from "lucide-react";
import React from "react";

const FormHeader = ({ description, title, id }: DetailFormData["data"]) => {
  const { onOpen } = useModalStore();
  return (
    <div className="rounded-lg shadow-lg border  px-8 py-4 space-y-4 border-background flex items-start justify-between">
      <div>
        <p className="text-xl md:text-2xl font-bold">{title}</p>
        <p>{description ? "no description" : description}</p>
      </div>
      <Button
        size={"sm"}
        variant={"ghost"}
        onClick={() =>
          onOpen("updateForm", {
            form: {
              data: {
                id,
                title,
                description,
              },
            },
          })
        }
      >
        <Pen className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default FormHeader;
