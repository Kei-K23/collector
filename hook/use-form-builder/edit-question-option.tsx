import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Question, QuestionOptionArray } from "@/type";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

interface EditQuestionOptionProps {
  setEditingQuestionOption: (editingQuestionOption: number | undefined) => void;
  setQuestionOptions: React.Dispatch<React.SetStateAction<QuestionOptionArray>>;
  editingQuestionOption: number;
  questionOptions: QuestionOptionArray;
}

const EditQuestionOption = ({
  setEditingQuestionOption,
  editingQuestionOption,
  setQuestionOptions,
  questionOptions,
}: EditQuestionOptionProps) => {
  // add question option
  function incrementQuestionOption() {
    const prevLength = questionOptions.length;
    setQuestionOptions([
      ...questionOptions,
      {
        option: `Option ${prevLength + 1}`,
        order: prevLength + 1,
      },
    ]);
  }
  return (
    <>
      <ul>
        {questionOptions.map((option, index) => {
          if (editingQuestionOption === index) {
            return (
              <Input
                key={index}
                value={option.option}
                defaultValue={option.option}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setEditingQuestionOption(undefined);
                    const updatedOptions = questionOptions.map((o, i) =>
                      i === index ? { ...o, option: option.option } : o
                    );
                    setQuestionOptions(updatedOptions);
                  }
                }}
                onChange={(e) =>
                  setQuestionOptions(
                    (prevOptions: { option: string; order: number }[]) => {
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
              <li key={index} onClick={() => setEditingQuestionOption(index)}>
                {option.option}
              </li>
            );
          }
        })}
      </ul>
      <Button type="button" onClick={() => incrementQuestionOption()}>
        <PlusCircle className="w-5 h-5" />
      </Button>
    </>
  );
};

export default EditQuestionOption;
