import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "./components/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Readonly<Props>) {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="p-8">
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
