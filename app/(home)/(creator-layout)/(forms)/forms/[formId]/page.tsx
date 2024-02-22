"use client";
import { DetailFormData, QuestionArray } from "@/type";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import FormHeader from "./_components/form-header";
import { PlusCircle } from "lucide-react";
import { defaultQuestionFormat } from "@/hook/use-form-builder/default-form";
import useFormBuilder from "@/hook/use-form-builder";

interface FormIdPageProps {
  params: {
    formId: string;
  };
}

const FormIdPage = ({ params }: FormIdPageProps) => {
  const { user } = useUser();

  const { isPending, data } = useQuery<DetailFormData>({
    queryKey: ["forms", user?.id, params?.formId],
    queryFn: () =>
      fetch(
        `http://localhost:3300/api/forms/${user?.id}/${params?.formId}`
      ).then((res) => res.json()),
  });

  const [questions, setQuestions] = useState<QuestionArray>(
    data?.data?.question ?? []
  );
  useEffect(() => {
    setQuestions(data?.data?.question ?? []);
  }, [data?.data?.question]);

  const questionsBuilder = useFormBuilder({ questions, formId: params.formId });

  function addNewQuestion() {
    const newQuestion = { ...defaultQuestionFormat["shortAnswerQuestion"] };
    newQuestion.formId = params.formId;

    // Get the highest order number in the existing questions array
    const highestOrder = questions.reduce(
      (maxOrder, question) => Math.max(maxOrder, question?.order!),
      0
    );

    // Set the order number for the new question
    newQuestion.order = highestOrder + 1;

    setQuestions((prev) => [...prev, newQuestion]);
  }

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

  return (
    <div className="pt-20 pb-16 mx-auto px-4 md:w-[700px] lg:w-[800px] xl:w-[750px] mt-10 mb-16 space-y-4">
      <FormHeader
        id={data.data?.id}
        title={data.data?.title}
        description={data.data?.description}
      />

      {/* render questions */}
      {questionsBuilder}
      {/* render questions */}

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
