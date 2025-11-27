"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TextAlignJustifyIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { ComponentProps, PropsWithChildren } from "react";

interface Props extends PropsWithChildren<ComponentProps<"header">> {
  children: React.ReactNode;
}

export function DashboardHeader({
  className,
  children,
  ...props
}: Readonly<Props>) {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <header className={cn("flex items-center gap-8", className)} {...props}>
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
