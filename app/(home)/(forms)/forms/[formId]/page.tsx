"use client";
import { DetailFormData, QuestionType } from "@/type";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import FormHeader from "./_components/form-header";
import { PlusCircle } from "lucide-react";

interface FormIdPageProps {
  params: {
    formId: string;
  };
}

type QuestionArray = Array<{
  text: string;
  description?: string;
  type: QuestionType;
  order: number;
}>;

const FormIdPage = ({ params }: FormIdPageProps) => {
  const { user } = useUser();

  const [questions, setQuestions] = useState<QuestionArray>([]);
  const [isEditing, setIsEditing] = useState<{
    order: number;
    isEditing: boolean;
  }>({ order: 0, isEditing: false });

  const defaultQuestionFormat = {
    shortAnswerQuestion: {
      text: "Question",
      description: "short answer text",
      type: QuestionType["SHORT_ANSWER"],
      formId: params.formId,
      order: 0,
    },
    paragraphQuestion: {
      text: "Question",
      description: "long answer text",
      type: QuestionType["PARAGRAPH"],
      formId: params.formId,
      order: 0,
    },
  };

  const questionsBuilder = useFormBuilder(questions);

  const { isPending, data } = useQuery<DetailFormData>({
    queryKey: ["forms", user?.id, params?.formId],
    queryFn: () =>
      fetch(
        `http://localhost:3300/api/forms/${user?.id}/${params?.formId}`
      ).then((res) => res.json()),
  });

  // TODO:: Loading
  if (isPending) {
    return <div>Loading...</div>;
  }

  // TODO:: Not found
  if (!data) {
    return (
      <div>
        <h2>No form</h2>
      </div>
    );
  }

  function editQuestion(order: number) {
    console.log("click");

    setIsEditing({ order, isEditing: true });
  }

  function useFormBuilder(questions: QuestionArray) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      function handleClickOutside(event: any) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          // Clicked outside the wrapperRef
          if (isEditing.isEditing) {
            // If editing is on, perform the necessary action here
            setIsEditing({ order: 0, isEditing: false });
          }
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on component unmount
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [wrapperRef, isEditing, isEditing.isEditing]);

    if (!questions.length) {
      return null; // or any other fallback
    }

    return questions.map((question, index) => (
      <div
        ref={wrapperRef}
        role="button"
        onClick={() => editQuestion(question.order)}
        key={index}
        className="rounded-lg shadow-lg border  px-8 py-4 space-y-4 border-background"
      >
        {isEditing.order === question.order && isEditing.isEditing ? (
          `is editing ${question.text} ${question.order}`
        ) : (
          <>
            <p className="text-lg">{question.text}</p>
            <p className="border-b dark:border-b-slate-800 border-b-slate-300 pb-2">
              {question.description}
            </p>
          </>
        )}
      </div>
    ));
  }

  // add new question
  function addNewQuestion() {
    if (questions.length === 0) {
      defaultQuestionFormat["shortAnswerQuestion"].order = 1;
    }

    defaultQuestionFormat["shortAnswerQuestion"].order = questions.length + 1;
    setQuestions((prev) => [
      ...prev,
      defaultQuestionFormat["shortAnswerQuestion"],
    ]);
  }

  return (
    <div className="pt-20 mx-auto px-4 md:w-[700px] lg:w-[800px] xl:w-[750px] my-6 space-y-4">
      <FormHeader
        id={data.data?.id}
        title={data.data?.title}
        description={data.data?.description}
      />
      {questionsBuilder}
      <div
        role="button"
        onClick={addNewQuestion}
        className="rounded-lg shadow-lg border  px-8 py-4 space-y-4 border-background flex  items-center cursor-pointer"
      >
        <PlusCircle className="w-7 h-7 mx-auto" />
      </div>
    </div>
  );
};

export default FormIdPage;
