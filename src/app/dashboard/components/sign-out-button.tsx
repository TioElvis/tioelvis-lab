"use client";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      onClick={() => signOut({ redirectTo: "/" })}>
      <LogOutIcon />
      Sign Out
    </Button>
  );
}
