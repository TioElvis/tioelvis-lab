"use client";
import { Button } from "@/components/ui/button";
import { TextAlignJustifyIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function Header() {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    isMobile && (
      <header className="w-full p-8">
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer"
          onClick={toggleSidebar}>
          <TextAlignJustifyIcon />
        </Button>
      </header>
    )
  );
}
