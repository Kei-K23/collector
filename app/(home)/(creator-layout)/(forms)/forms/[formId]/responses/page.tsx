"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DetailFormData } from "@/type";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { ArrowBigLeftDash } from "lucide-react";
import Link from "next/link";
import React from "react";

interface FormIdResponsePageProps {
  params: {
    formId: string;
  };
}

const FormIdResponsePage = ({ params }: FormIdResponsePageProps) => {
  const { user } = useUser();

  const { isPending, data } = useQuery<DetailFormData>({
    queryKey: ["forms", "responses", params?.formId],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/forms/detail/${params?.formId}`
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

  return (
    <div className="pt-20 pb-16 mx-auto px-4 md:w-[700px] lg:w-[800px] xl:w-[750px] mt-10 mb-16 space-y-4">
      <Link
        className={cn(
          buttonVariants({
            variant: "default",
            className: "flex items-center gap-2",
          })
        )}
        href={`/forms/${params.formId}`}
      >
        <ArrowBigLeftDash /> Go to form
      </Link>
      <div className="space-y-4">
        {data.data?.question?.map((q) => (
          <div
            className="rounded-lg shadow-lg border  px-8 py-4 space-y-4 border-background"
            key={q.id}
          >
            <div className="flex items-center gap-x-2">
              <h3>Question : {q?.text}</h3>
              <h3 className="text-muted-foreground">({q.type})</h3>
            </div>
            {q.answer && q.answer.length > 0 && (
              <ul className="space-y-2">
                {q.answer.map((a) => {
                  if (a.text) {
                    return (
                      <li className="list-decimal" key={a.id}>
                        {a?.text}
                      </li>
                    );
                  }
                })}
              </ul>
            )}
            {q?.questionOption && (
              <ul className="space-y-2">
                {q.questionOption.map((qo) => (
                  <li key={qo.id} className="flex items-center gap-x-2">
                    <p>{qo.option}</p>
                    <span>
                      ({qo.answerOption.length}{" "}
                      {qo.answerOption.length > 1 ? "responses" : "response"})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormIdResponsePage;
