"use client";
import { useUser } from "@clerk/nextjs";
import { User2Icon } from "lucide-react";
import React from "react";
import { UserButton as ClerkUserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const UserButton = () => {
  const { isLoaded } = useUser();
  const { resolvedTheme } = useTheme();
  return (
    <div>
      {isLoaded ? (
        resolvedTheme === "dark" ? (
          <ClerkUserButton
            appearance={{
              baseTheme: dark,
            }}
            afterSignOutUrl="/sign-in"
            afterSwitchSessionUrl="/sign-in"
          />
        ) : (
          <ClerkUserButton
            afterSignOutUrl="/sign-in"
            afterSwitchSessionUrl="/sign-in"
          />
        )
      ) : (
        <User2Icon />
      )}
    </div>
  );
};

export default UserButton;
