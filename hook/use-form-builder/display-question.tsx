import { Button } from "@/components/ui/button";
import React from "react";
import QuestionOptions from "./display-question-options";
import { Question } from "@/type";
import { Pen } from "lucide-react";
import DeleteQuestion from "./delete-question";

interface DisplayQuestionProps {
  formId: string;
  question: Question;
  setEditingQuestion: (question: Question | null) => void;
}

const DisplayQuestion = ({
  formId,
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
      <div className="flex items-center gap-2">
        <Button size={"sm"} onClick={() => handleEditQuestion(question)}>
          <Pen className="w-5 h-5" />
        </Button>
        {question.id && <DeleteQuestion question={question} formId={formId} />}
      </div>
    </>
  );
};

export default DisplayQuestion;
