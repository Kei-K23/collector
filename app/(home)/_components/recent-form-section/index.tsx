"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import RecentForm from "./recent-form";
import type { FormData } from "@/type";

const RecentFormSection = () => {
  const { user } = useUser();

  const { isPending, error, data } = useQuery({
    queryKey: ["forms", user?.id],
    queryFn: () =>
      fetch(`http://localhost:3300/api/forms/${user?.id}`).then((res) =>
        res.json()
      ),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <section className="my-8 h-full ">
      <h2 className="text-lg mb-7">Recently created forms</h2>
      <div className="grid grid-cols-4">
        {data?.data?.map((form: FormData) => (
          <RecentForm
            key={form.id}
            title={form.title}
            createdAt={form.createdAt}
            formId={form.id}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentFormSection;
