"use client";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { SignOutButton } from "@/components/sign-out-button";
import { FoldersIcon, HomeIcon, PlusIcon } from "lucide-react";

export function DashboardSidebar() {
  const session = useSession();
  const user = session.data?.user;

  const { setOpenMobile } = useSidebar();

  const pathname = usePathname();

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="gap-0">
        <h2 className="text-xl font-bold text-primary">TioElvis Lab</h2>
        <p className="text-xs text-muted-foreground">Dashboard</p>
      </SidebarHeader>
      <SidebarContent className="py-6 px-2 lg:px-0">
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
                  className="justify-start"
                  variant={isActive ? "default" : "ghost"}
                  asChild
                >
                  <SidebarMenuButton asChild>
                    <Link href={path} onClick={() => setOpenMobile(false)}>
                      <Icon />
                      {title}
                    </Link>
                  </SidebarMenuButton>
                </Button>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div>
          <p className="text-sm">{user?.name}</p>
          <p className="text-muted-foreground text-xs">{user?.email}</p>
        </div>
        <ModeToggle className="w-full" />
        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
