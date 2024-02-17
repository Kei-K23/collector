import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Question, QuestionOptionArray, QuestionType } from "@/type";
import { Circle, PlusCircle, Square } from "lucide-react";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type Option = {
  option: string;
  order: number;
};
interface EditQuestionOptionProps {
  setEditingQuestionOption: (editingQuestionOption: number | undefined) => void;
  setQuestionOptions: React.Dispatch<React.SetStateAction<QuestionOptionArray>>;
  editingQuestionOption: number;
  questionOptions: QuestionOptionArray;
  type: QuestionType;
}

const EditQuestionOption = ({
  setEditingQuestionOption,
  editingQuestionOption,
  setQuestionOptions,
  questionOptions,
  type,
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

  // when enter key is pressed, edit question option
  function onKeyDown(event: KeyboardEvent, index: number, option: Option) {
    if (event.key === "Enter") {
      setEditingQuestionOption(undefined);
      const updatedOptions = questionOptions.map((o, i) =>
        i === index ? { ...o, option: option.option } : o
      );
      setQuestionOptions(updatedOptions);
    }
  }

  // on change
  function onChange(
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    option: Option
  ) {
    setQuestionOptions((prevOptions: { option: string; order: number }[]) => {
      const newOptions = [...prevOptions];
      newOptions[index] = {
        ...option,
        option: e.target.value,
      };
      return newOptions;
    });
  }

  return (
    <>
      <ul className="space-y-2">
        {questionOptions.map((option, index) => {
          if (editingQuestionOption === index) {
            return (
              <Input
                key={index}
                value={option.option}
                defaultValue={option.option}
                onKeyDown={(e) => onKeyDown(e, index, option)}
                onChange={(e) => onChange(e, index, option)}
              />
            );
          } else {
            if (type === QuestionType["DROPDOWN"]) {
              return (
                <li
                  key={option.order}
                  onClick={() => setEditingQuestionOption(index)}
                >
                  {`${index + 1}.`} {option.option}
                </li>
              );
            } else if (type === QuestionType["CHECKBOXES"]) {
              return (
                <li
                  key={option.order}
                  className="flex items-center gap-2"
                  onClick={() => setEditingQuestionOption(index)}
                >
                  <Square className="w-4 h-4 text-muted-foreground" />{" "}
                  {option.option}
                </li>
              );
            } else if (type === QuestionType["MULTIPLE_CHOICE"]) {
              return (
                <li
                  key={option.order}
                  className="flex items-center gap-2"
                  onClick={() => setEditingQuestionOption(index)}
                >
                  <Circle className="w-4 h-4 text-muted-foreground" />{" "}
                  {option.option}
                </li>
              );
            }
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
