"use client";
import { useUser } from "@clerk/nextjs";
import { User2Icon } from "lucide-react";
import React from "react";
import { UserButton as ClerkUserButton } from "@clerk/nextjs";

const UserButton = () => {
  const { isLoaded } = useUser();
  return (
    <div>
      {isLoaded ? (
        <ClerkUserButton
          afterSignOutUrl="/sign-in"
          afterSwitchSessionUrl="/sign-in"
        />
      ) : (
        <User2Icon />
      )}
    </div>
  );
};

export default UserButton;
