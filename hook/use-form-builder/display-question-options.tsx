import { QuestionOptionArray, QuestionType } from "@/type";
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
        }
      })}
    </ul>
  );
};

export default DisplayQuestionOptions;
