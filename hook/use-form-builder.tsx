export const defaultQuestionFormat = {
  shortAnswerQuestion: {
    text: "Untitled Question",
    description: "short answer text",
    type: QuestionType["SHORT_ANSWER"],
    formId: "",
    order: 0,
  },
  paragraphQuestion: {
    text: "Untitled Question",
    description: "long answer text",
    type: QuestionType["PARAGRAPH"],
    formId: "",
    order: 0,
  },
};

import React, { FormEvent, Ref, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionArray, QuestionType } from "@/type";

interface useFormBuilderProps {
  questions: QuestionArray;
  formId: string;
  // onQuestionUpdate: (updatedQuestion: Question) => void;
}

interface Question {
  id?: string;
  text?: string;
  description?: string | null;
  type?: QuestionType;
  formId?: string;
  order?: number;
}

const useFormBuilder = ({
  questions,
  formId,
}: // onQuestionUpdate,
useFormBuilderProps) => {
  const { user } = useUser();
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const queryClient = useQueryClient();

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion({ ...question });
  };

  const handleSaveQuestion = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !editingQuestion) return;

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
            }),
          }
        );

        const data = await res.json();
        if (data.success && data.status === 200) {
          queryClient.invalidateQueries({
            queryKey: ["forms", user?.id, formId],
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
            queryKey: ["forms", user?.id, formId],
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!editingQuestion) return;
    setEditingQuestion({ ...editingQuestion, [name]: value });
  };

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
              <form
                onSubmit={handleSaveQuestion}
                ref={formRef}
                className="space-y-8"
              >
                <Input
                  placeholder="e.g. multi selection"
                  value={editingQuestion.text}
                  name="text"
                  onChange={handleChange}
                />

                <Input
                  placeholder="e.g. some description"
                  value={editingQuestion.description!}
                  name="description"
                  onChange={handleChange}
                />

                {/* TODO:: Create question option */}
                {editingQuestion.type === QuestionType["DROPDOWN"] && (
                  <select id="choices">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                  </select>
                )}

                <select
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                  name="type"
                  value={editingQuestion.type}
                  onChange={(e) => {
                    if (e.target.value === QuestionType["PARAGRAPH"]) {
                      setEditingQuestion({
                        ...editingQuestion,
                        text: defaultQuestionFormat.paragraphQuestion.text,
                        description:
                          defaultQuestionFormat.paragraphQuestion.description,
                        type: e.target.value as QuestionType,
                      });
                    } else if (
                      e.target.value === QuestionType["SHORT_ANSWER"]
                    ) {
                      setEditingQuestion({
                        ...editingQuestion,
                        text: defaultQuestionFormat.shortAnswerQuestion.text,
                        description:
                          defaultQuestionFormat.shortAnswerQuestion.description,
                        type: e.target.value as QuestionType,
                      });
                    } else if (e.target.value === QuestionType["DROPDOWN"]) {
                      setEditingQuestion({
                        ...editingQuestion,
                        type: e.target.value as QuestionType,
                      });
                    }
                  }}
                >
                  {[
                    "SHORT_ANSWER",
                    "PARAGRAPH",
                    "MULTIPLE_CHOICE",
                    "CHECKBOXES",
                    "DROPDOWN",
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <Button type="submit">Save</Button>
              </form>
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
