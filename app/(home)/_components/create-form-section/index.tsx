import React from "react";
import CreateForm from "./create-form";

const CreateFormSection = () => {
  return (
    <section className="my-8">
      <h2 className="text-lg mb-7">Start a new form</h2>
      <div className="grid grid-cols-4">
        <CreateForm />
      </div>
    </section>
  );
};

export default CreateFormSection;
