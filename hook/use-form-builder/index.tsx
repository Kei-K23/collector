import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { QuestionArray, QuestionType } from "@/type";
import CreateAndEditQuestionForm from "./create-and-edit-question-form";

interface useFormBuilderProps {
  questions: QuestionArray;
  formId: string;
}

export interface Question {
  id?: string;
  text?: string;
  description?: string | null;
  type?: QuestionType;
  formId?: string;
  order?: number;
}

const useFormBuilder = ({ questions, formId }: useFormBuilderProps) => {
  const { user } = useUser();

  const [editingQuestionOption, setEditingQuestionOption] = useState<
    number | null
  >();

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const [questionOptions, setQuestionOptions] = useState<
    Array<{
      option: string;
      order: number;
    }>
  >([]);

  const queryClient = useQueryClient();

  const formRef = useRef<HTMLFormElement | null>(null);

  // handle question editing
  const handleEditQuestion = (question: Question) => {
    setEditingQuestion({ ...question });
  };

  // effect for click outside of question when editing the question
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setEditingQuestion(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {questions.map((question, index) => (
        <div
          key={index}
          className="rounded-lg shadow-lg border px-8 py-4 space-y-4 border-background"
        >
          {editingQuestion && editingQuestion.order === question.order ? (
            <>
              <CreateAndEditQuestionForm
                editingQuestion={editingQuestion}
                editingQuestionOption={editingQuestionOption!}
                formId={formId}
                userId={user?.id!}
                formRef={formRef}
                queryClient={queryClient}
                questionOptions={questionOptions}
                setEditingQuestion={setEditingQuestion}
                setEditingQuestionOption={setEditingQuestionOption}
                setQuestionOptions={setQuestionOptions}
              />
            </>
          ) : (
            <>
              <p className="text-lg">{question.text}</p>
              <p className="border-b dark:border-b-slate-800 border-b-slate-300 pb-2">
                {question.description}
              </p>
              <Button onClick={() => handleEditQuestion(question)}>Edit</Button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default useFormBuilder;
