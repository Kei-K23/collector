"use client";

import { Button } from "@/components/ui/button";
import { Question, QuestionOptionArray } from "@/type";
import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { Loader, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface DeleteQuestionOptionProps {
  question: Question;
  questionOptionId: string;
  formId: string;
  questionOptions: QuestionOptionArray;
}

const DeleteQuestionOption = ({
  questionOptionId,
  question,
  questionOptions,
  formId,
}: DeleteQuestionOptionProps) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteQuestionOption = async (question: Question) => {
    if (!question.id || !formId || !questionOptionId) return;

    if (questionOptions.length < 1) return;

    try {
      setIsLoading(true);

      const res = await fetch(
        `http://localhost:3300/api/questions/${question.id}/${formId}/${questionOptionId}`,
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
      onClick={(e) => {
        e.stopPropagation(); // prevent
        handleDeleteQuestionOption(question);
      }}
      variant={"destructive"}
    >
      {isLoading ? (
        <Loader className="w-5 h-5 animate-spin" />
      ) : (
        <X className="w-5 h-5" />
      )}
    </Button>
  );
};

export default DeleteQuestionOption;
