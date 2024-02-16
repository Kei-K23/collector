import React from "react";
import { handleQuestionRequest } from "./handle-request";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Question } from ".";
import { QueryClient } from "@tanstack/react-query";
import { QuestionType } from "@/type";

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

interface CreateAndEditQuestionFormProps {
  userId: string;
  formId: string;
  editingQuestionOption: number;
  setEditingQuestionOption: (editingQuestionOption: number | undefined) => void;
  editingQuestion: Question;
  setEditingQuestion: (question: Question | null) => void;
  queryClient: QueryClient;
  formRef: React.MutableRefObject<HTMLFormElement | null>;
  questionOptions: Array<{
    option: string;
    order: number;
  }>;
  setQuestionOptions: (
    questionOptions: Array<{
      option: string;
      order: number;
    }>
  ) => void;
}

const CreateAndEditQuestionForm = ({
  userId,
  formId,
  editingQuestion,
  setEditingQuestion,
  queryClient,
  formRef,
  questionOptions,
  setQuestionOptions,
  setEditingQuestionOption,
  editingQuestionOption,
}: CreateAndEditQuestionFormProps) => {
  // form input onchange handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!editingQuestion) return;
    setEditingQuestion({ ...editingQuestion, [name]: value });
  };

  // add question option
  function incrementQuestionOption(type: QuestionType) {
    const prevLength = questionOptions.length;
    setQuestionOptions([
      ...questionOptions,
      {
        option: `${type} ${prevLength + 1}`,
        order: prevLength + 1,
      },
    ]);
  }

  return (
    <form
      onSubmit={(e) =>
        handleQuestionRequest({
          e,
          editingQuestion,
          setEditingQuestion,
          userId: userId,
          formId: formId,
          queryClient,
          questionOption: questionOptions,
        })
      }
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

      {editingQuestion.type === QuestionType["DROPDOWN"] &&
        questionOptions.length > 0 && (
          <>
            <ul>
              {questionOptions.map((option, index) => {
                if (editingQuestionOption === index) {
                  return (
                    <Input
                      key={index}
                      value={option.option} // Use option.option as value
                      defaultValue={option.option}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setEditingQuestionOption(undefined);
                          const updatedOptions = questionOptions.map((o, i) =>
                            i === index
                              ? { ...o, option: option.option } // Use option.option
                              : o
                          );
                          setQuestionOptions(updatedOptions);
                        }
                      }}
                      onChange={(e) =>
                        setQuestionOptions(
                          (
                            prevOptions: { option: string; order: number }[]
                          ) => {
                            const newOptions = [...prevOptions];
                            newOptions[index] = {
                              ...option,
                              option: e.target.value,
                            };
                            return newOptions;
                          }
                        )
                      }
                    />
                  );
                } else {
                  return (
                    <li
                      key={index}
                      onClick={() => setEditingQuestionOption(index)}
                    >
                      {option.option}
                    </li>
                  );
                }
              })}
            </ul>
            <Button
              type="button"
              onClick={() => incrementQuestionOption(editingQuestion.type!)}
            >
              <PlusCircle className="w-5 h-5" />
            </Button>
          </>
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
              description: defaultQuestionFormat.paragraphQuestion.description,
              type: e.target.value as QuestionType,
            });
            setQuestionOptions([]);
          } else if (e.target.value === QuestionType["SHORT_ANSWER"]) {
            setEditingQuestion({
              ...editingQuestion,
              text: defaultQuestionFormat.shortAnswerQuestion.text,
              description:
                defaultQuestionFormat.shortAnswerQuestion.description,
              type: e.target.value as QuestionType,
            });
            setQuestionOptions([]);
          } else if (e.target.value === QuestionType["DROPDOWN"]) {
            // setQuestionOptions((prev) => [
            //   ...prev,
            //   { option: "Dropdown 1", order: 1 },
            // ]);
            setQuestionOptions([
              ...questionOptions,
              { option: "Dropdown 1", order: 1 },
            ]);

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
  );
};

export default CreateAndEditQuestionForm;
