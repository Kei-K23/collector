import { FormEvent } from "react";
import { toast } from "sonner";
import { QueryClient } from "@tanstack/react-query";
import { Question, QuestionArray } from "@/type";
import next from "next";

interface HandleQuestionRequestProps {
  e: FormEvent;
  userId: string;
  formId: string;
  editingQuestion: Question;
  setEditingQuestion: (question: Question | null) => void;
  queryClient: QueryClient;
  questionOption?: QuestionArray;
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

  const endpoint = editingQuestion.id
    ? `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/questions/${editingQuestion.id}/${formId}`
    : `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/questions`;

  const method = editingQuestion.id ? "PUT" : "POST";
  const successMessage = editingQuestion.id
    ? "Updated question successfully"
    : "Added question successfully";

  const bodyData = editingQuestion.id
    ? JSON.stringify({
        text: editingQuestion.text,
        description: editingQuestion.description,
        type: editingQuestion.type,
        order: editingQuestion.order,
        questionOption:
          questionOption && questionOption.length > 0 ? questionOption : [],
      })
    : JSON.stringify({
        data: [
          {
            formId: editingQuestion.formId,
            text: editingQuestion.text,
            description: editingQuestion.description,
            type: editingQuestion.type,
            order: editingQuestion.order,
            questionOption:
              questionOption && questionOption.length > 0 ? questionOption : [],
          },
        ],
      });

  try {
    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: bodyData,
    });

    const data = await res.json();
    if (data.success && data.status === (editingQuestion.id ? 200 : 201)) {
      queryClient.invalidateQueries({
        queryKey: ["forms", userId, formId],
      });
      setEditingQuestion(null);
      toast.success(successMessage);
    } else {
      toast.error("Something went wrong!");
    }
  } catch (error) {
    console.log(error);

    toast.error("An error occurred while saving the question.");
  }
};
