import { QuestionOptionArray, QuestionType } from "@/type";
import { Circle, Square } from "lucide-react";
import React from "react";

interface DisplayQuestionOptionsProps {
  type: QuestionType;
  questionOption: QuestionOptionArray;
}

const DisplayQuestionOptions = ({
  type,
  questionOption,
}: DisplayQuestionOptionsProps) => {
  if (!questionOption) {
    return null;
  }

  if (questionOption?.length === 0) return null;

  return (
    <ul className="space-y-2">
      {questionOption.map((option, index) => {
        if (type === QuestionType["DROPDOWN"]) {
          return (
            <li key={option.order}>
              {`${index + 1}.`} {option.option}
            </li>
          );
        } else if (type === QuestionType["CHECKBOXES"]) {
          return (
            <li key={option.order} className="flex items-center gap-2">
              <Square className="w-4 h-4 text-muted-foreground" />{" "}
              {option.option}
            </li>
          );
        } else if (type === QuestionType["MULTIPLE_CHOICE"]) {
          return (
            <li key={option.order} className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-muted-foreground" />{" "}
              {option.option}
            </li>
          );
        }
      })}
    </ul>
  );
};

export default DisplayQuestionOptions;
