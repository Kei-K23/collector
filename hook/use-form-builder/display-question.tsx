import { Button } from "@/components/ui/button";
import React from "react";
import QuestionOptions from "./display-question-options";
import { Question } from "@/type";

interface DisplayQuestionProps {
  question: Question;
  setEditingQuestion: (question: Question | null) => void;
}

const DisplayQuestion = ({
  question,
  setEditingQuestion,
}: DisplayQuestionProps) => {
  // handle question editing
  const handleEditQuestion = (question: Question) => {
    setEditingQuestion({ ...question });
  };

  return (
    <>
      <p className="text-lg">{question.text}</p>
      <p className="border-b dark:border-b-slate-800 border-b-slate-300 pb-2">
        {question.description}
      </p>

      <QuestionOptions
        type={question.type!}
        questionOption={question.questionOption!}
      />
      <Button onClick={() => handleEditQuestion(question)}>Edit</Button>
    </>
  );
};

export default DisplayQuestion;
