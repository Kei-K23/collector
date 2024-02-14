"use client";
import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function Page() {
  const { resolvedTheme } = useTheme();

  if (resolvedTheme === "dark") {
    return (
      <SignUp
        appearance={{
          baseTheme: dark,
        }}
      />
    );
  } else {
    return <SignUp />;
  }
}
