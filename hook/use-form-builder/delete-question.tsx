"use client";

import { Button } from "@/components/ui/button";
import { Question } from "@/type";
import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { Loader, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface DeleteQuestionProps {
  question: Question;
  formId: string;
}

const DeleteQuestion = ({ formId, question }: DeleteQuestionProps) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteQuestion = async (question: Question) => {
    if (!question.id || !formId) return;

    try {
      setIsLoading(true);

      const res = await fetch(
        `http://localhost:3300/api/questions/${question.id}/${formId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();

      if (data.success && res.ok) {
        queryClient.invalidateQueries({
          queryKey: ["forms", user?.id, formId],
        });
        toast.success("Question deleted successfully");
      } else {
        toast.error(data.message);
      }
    } catch (e: any) {
      setIsLoading(true);
      toast.error("Failed to delete question");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      size={"sm"}
      onClick={() => handleDeleteQuestion(question)}
      variant={"destructive"}
    >
      {isLoading ? (
        <Loader className="w-5 h-5 animate-spin" />
      ) : (
        <Trash2Icon className="w-5 h-5" />
      )}
    </Button>
  );
};

export default DeleteQuestion;
