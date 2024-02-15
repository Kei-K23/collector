"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface FormIdPageProps {
  params: {
    formId: string;
  };
}

const FormIdPage = ({ params }: FormIdPageProps) => {
  const { user } = useUser();
  const { isPending, data } = useQuery({
    queryKey: ["forms", user?.id, params?.formId],
    queryFn: () =>
      fetch(
        `http://localhost:3300/api/forms/${user?.id}/${params?.formId}`
      ).then((res) => res.json()),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div>
      user: {user?.id} form id :{params.formId}
      <p>{data.data.title}</p>
      <p>{data.data?.description}</p>
    </div>
  );
};

export default FormIdPage;
