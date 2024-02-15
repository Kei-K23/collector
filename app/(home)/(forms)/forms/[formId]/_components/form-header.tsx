import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import React from "react";

interface FormHeaderProps {
  title: string;
  description?: string;
}

const FormHeader = ({ title, description }: FormHeaderProps) => {
  return (
    <div className="rounded-lg shadow-lg border  px-8 py-4 space-y-4 border-background flex items-start justify-between">
      <div>
        <p className="text-xl md:text-2xl font-bold">{title}</p>
        <p>{description ? "no description" : description}</p>
      </div>
      <Button size={"sm"} variant={"ghost"}>
        <Pen className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default FormHeader;
