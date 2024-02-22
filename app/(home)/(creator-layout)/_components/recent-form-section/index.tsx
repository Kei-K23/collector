"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import RecentForm from "./recent-form";
import type { FormData } from "@/type";

const RecentFormSection = () => {
  const { user } = useUser();

  const { isPending, data } = useQuery({
    queryKey: ["forms", user?.id],
    queryFn: () =>
      fetch(`http://localhost:3300/api/forms/${user?.id}`).then((res) =>
        res.json()
      ),
  });

  // TODO:: Add loading indicator
  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <section className="my-8 pb-12">
      <h2 className="text-lg mb-7">Recently created forms</h2>
      <div className="grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-5 gap-x-8">
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
