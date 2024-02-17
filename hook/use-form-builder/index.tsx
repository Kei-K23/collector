import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { QuestionArray, QuestionType } from "@/type";
import CreateAndEditQuestionForm from "./create-and-edit-question-form";
import DisplayQuestion from "./display-question";

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
  const queryClient = useQueryClient();

  const [editingQuestionOption, setEditingQuestionOption] = useState<
    number | null
  >();

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

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
                setEditingQuestion={setEditingQuestion}
                setEditingQuestionOption={setEditingQuestionOption}
              />
            </>
          ) : (
            <>
              <DisplayQuestion
                formId={formId}
                question={question}
                setEditingQuestion={setEditingQuestion}
              />
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default useFormBuilder;
