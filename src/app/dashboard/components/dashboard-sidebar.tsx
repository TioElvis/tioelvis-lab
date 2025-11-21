import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { SignOutButton } from "./sign-out-button";
import { ModeToggle } from "@/components/mode-toggle";
import { DashboardSidebarMenu } from "./dashboard-sidebar-menu";

export async function DashboardSidebar() {
  const session = await auth();
  const user = session?.user;

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="gap-0">
        <h2 className="text-xl font-bold text-primary">TioElvis Lab</h2>
        <p className="text-xs text-muted-foreground">Dashboard</p>
      </SidebarHeader>
      <SidebarContent className="py-6">
        <DashboardSidebarMenu />
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
