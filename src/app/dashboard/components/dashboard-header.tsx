"use client";
import { Button } from "@/components/ui/button";
import { TextAlignJustifyIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

interface Props {
  children: React.ReactNode;
}

export function DashboardHeader({ children }: Readonly<Props>) {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <header className="flex items-center gap-8">
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer"
          onClick={toggleSidebar}>
          <TextAlignJustifyIcon />
        </Button>
      )}
      {children}
    </header>
  );
}
