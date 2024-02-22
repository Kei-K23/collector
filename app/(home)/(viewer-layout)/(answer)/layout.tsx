import React from "react";
import Navbar from "../_components/navbar";

const AnswerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default AnswerLayout;
