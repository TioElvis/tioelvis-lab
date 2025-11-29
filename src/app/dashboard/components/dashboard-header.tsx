"use client";
import { usePathname } from "next/navigation";
import { AlignJustifyIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function DashboardHeader() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const lastSegment = pathname?.split("/").filter(Boolean).pop() ?? "";
  const title =
    lastSegment === ""
      ? "Dashboard"
      : lastSegment
          .replace(/[-_]/g, " ")
          .split(" ")
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(" ");

  return (
    <header className="flex items-center gap-4 sticky top-0 py-4 bg-background">
      <button onClick={() => toggleSidebar()}>
        <AlignJustifyIcon className="w-8 h-8 md:w-12 md:h-12" />
      </button>
      <h1>{title}</h1>
    </header>
  );
}
