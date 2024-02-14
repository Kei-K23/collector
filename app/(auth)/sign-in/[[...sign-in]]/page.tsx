"use client";
import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function Page() {
  const { resolvedTheme } = useTheme();

  if (resolvedTheme === "dark") {
    return (
      <SignIn
        appearance={{
          baseTheme: dark,
        }}
      />
    );
  } else {
    return <SignIn />;
  }
}
