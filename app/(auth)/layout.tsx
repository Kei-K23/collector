import React, { Suspense } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <h1 className="text-4xl font-semibold mb-4">
        Quickly obtain insights with{" "}
        <span className="underline text-purple-700">Collector</span>{" "}
      </h1>
      {children}
    </div>
  );
};

export default AuthLayout;
