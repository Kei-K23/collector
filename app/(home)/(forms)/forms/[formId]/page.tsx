"use client";
import type { DetailFormData } from "@/type";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import FormHeader from "./_components/form-header";

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

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return (
      <div>
        <h2>No form</h2>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 md:w-[700px] lg:w-[800px] xl:w-[750px] my-6 space-y-4">
      <FormHeader
        title={data.data?.title}
        description={data.data?.description}
      />
    </div>
  );
};

export default FormIdPage;
