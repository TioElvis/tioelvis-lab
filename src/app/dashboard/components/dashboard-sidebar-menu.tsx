"use client";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FoldersIcon, HomeIcon, PlusIcon } from "lucide-react";

export function DashboardSidebarMenu() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="space-y-2">
      {[
        {
          title: "Dashboard",
          path: "/dashboard",
          Icon: HomeIcon,
        },
        {
          title: "All Projects",
          path: "/dashboard/projects",
          Icon: FoldersIcon,
        },
        {
          title: "New Project",
          path: "/dashboard/projects/new",
          Icon: PlusIcon,
        },
      ].map(({ title, path, Icon }) => {
        const isActive = pathname === path;

        return (
          <SidebarMenuItem key={title}>
            <Button
              className="cursor-pointer justify-start"
              variant={isActive ? "default" : "ghost"}
              asChild>
              <SidebarMenuButton
                asChild
                className={cn(isActive && "hover:text-primary-foreground")}>
                <Link href={path}>
                  <Icon />
                  {title}
                </Link>
              </SidebarMenuButton>
            </Button>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
