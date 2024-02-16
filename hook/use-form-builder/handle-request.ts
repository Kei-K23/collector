import { FormEvent } from "react";
import { Question } from ".";
import { toast } from "sonner";
import { QueryClient } from "@tanstack/react-query";

interface HandleQuestionRequestProps {
  e: FormEvent;
  userId: string;
  formId: string;
  editingQuestion: Question;
  setEditingQuestion: (question: Question | null) => void;
  queryClient: QueryClient;
  questionOption?: Array<{ option: string }>;
}

export const handleQuestionRequest = async ({
  e,
  userId,
  formId,
  editingQuestion,
  setEditingQuestion,
  queryClient,
  questionOption,
}: HandleQuestionRequestProps) => {
  e.preventDefault();
  if (!userId || !editingQuestion) return;

  try {
    if (editingQuestion.id) {
      const res = await fetch(
        `http://localhost:3300/api/questions/${editingQuestion.id}/${formId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            text: editingQuestion.text,
            description: editingQuestion.description,
            type: editingQuestion.type,
            order: editingQuestion.order,
            questionOption:
              questionOption && questionOption.length > 0
                ? questionOption.map((q) => {
                    return {
                      option: q.option,
                    };
                  })
                : [],
          }),
        }
      );

      const data = await res.json();
      if (data.success && data.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["forms", userId, formId],
        });
        setEditingQuestion(null);
        toast.success("Updated question successfully");
      } else {
        toast.error("Something went wrong!");
      }
    } else {
      const res = await fetch(`http://localhost:3300/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              formId: editingQuestion.formId,
              text: editingQuestion.text,
              description: editingQuestion.description,
              type: editingQuestion.type,
              order: editingQuestion.order,
            },
          ],
        }),
      });

      const data = await res.json();
      if (data.success && data.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["forms", userId, formId],
        });
        setEditingQuestion(null);
        toast.success("Added question successfully");
      } else {
        toast.error("Something went wrong!");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("An error occurred while saving the question.");
  }
};
