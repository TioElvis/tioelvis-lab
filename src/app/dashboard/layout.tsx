import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Header } from "./components/header";
import { DashboardSidebar } from "./components/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Readonly<Props>) {
  const session = await auth();

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
