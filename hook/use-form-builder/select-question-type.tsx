import { Question, QuestionOptionArray, QuestionType } from "@/type";
import React from "react";
import { defaultQuestionFormat, questionType } from "./default-form";

interface SelectQuestionTypeProps {
  editingQuestion: Question;
  setEditingQuestion: (question: Question | null) => void;
  setQuestionOptions: React.Dispatch<React.SetStateAction<QuestionOptionArray>>;
}

const SelectQuestionType = ({
  editingQuestion,
  setEditingQuestion,
  setQuestionOptions,
}: SelectQuestionTypeProps) => {
  // function to change the type

  function onChange(value: QuestionType) {
    let updatedQuestion: Question = { ...editingQuestion };

    switch (value) {
      case QuestionType.SHORT_ANSWER:
        updatedQuestion = {
          ...updatedQuestion,
          text: defaultQuestionFormat.shortAnswerQuestion.text,
          description: defaultQuestionFormat.shortAnswerQuestion.description,
        };
        break;
      case QuestionType.PARAGRAPH:
        updatedQuestion = {
          ...updatedQuestion,
          text: defaultQuestionFormat.paragraphQuestion.text,
          description: defaultQuestionFormat.paragraphQuestion.description,
        };
        break;
      case QuestionType.DROPDOWN:
        setQuestionOptions([{ option: "Option 1", order: 1 }]);
        updatedQuestion = {
          ...updatedQuestion,
          text: defaultQuestionFormat.dropdownQuestion.text,
          description: defaultQuestionFormat.dropdownQuestion.description,
        };
        break;
      case QuestionType.MULTIPLE_CHOICE:
        setQuestionOptions([{ option: "Option 1", order: 1 }]);
        updatedQuestion = {
          ...updatedQuestion,
          text: defaultQuestionFormat.multipleChoicesQuestion.text,
          description:
            defaultQuestionFormat.multipleChoicesQuestion.description,
        };
        break;
      case QuestionType.CHECKBOXES:
        setQuestionOptions([{ option: "Option 1", order: 1 }]);
        updatedQuestion = {
          ...updatedQuestion,
          text: defaultQuestionFormat.checkboxesQuestion.text,
          description: defaultQuestionFormat.checkboxesQuestion.description,
        };
        break;
      default:
        updatedQuestion = {
          ...updatedQuestion,
          text: defaultQuestionFormat.shortAnswerQuestion.text,
          description: defaultQuestionFormat.shortAnswerQuestion.description,
        };
        break;
    }
    updatedQuestion.type = value;
    setEditingQuestion(updatedQuestion);
  }

  return (
    <select
      className="flex h-10 w-[35%] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
      name="type"
      value={editingQuestion.type}
      onChange={(e) => {
        onChange(e.target.value as QuestionType);
      }}
    >
      {questionType.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default SelectQuestionType;
