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
  order: number;
  questionOptions: QuestionOptionArray;
  setQuestionOptions: React.Dispatch<React.SetStateAction<QuestionOptionArray>>;
}

const DeleteQuestionOption = ({
  questionOptionId,
  question,
  questionOptions,
  formId,
  order,
  setQuestionOptions,
}: DeleteQuestionOptionProps) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteQuestionOption = async (question: Question) => {
    if (!question.id || !formId) return;

    if (questionOptions.length < 1) return;

    if (questionOptionId) {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/questions/${question.id}/${formId}/${questionOptionId}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();

        if (data.success && res.ok) {
          // invalid question
          queryClient.invalidateQueries({
            queryKey: ["forms", user?.id, formId],
          });

          // invalid question option for client side state
          setQuestionOptions((prev) =>
            prev.filter((o) => o.id !== questionOptionId)
          );
        } else {
          toast.error(data.message);
        }
      } catch (e: any) {
        setIsLoading(true);
        toast.error("Failed to delete question");
      } finally {
        setIsLoading(false);
      }
    } else {
      // invalid question option for client side state
      setQuestionOptions((prev) => prev.filter((o) => o.order !== order));
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
