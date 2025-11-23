import { DashboardHeader } from "@/app/dashboard/components/dashboard-header";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Readonly<Props>) {
  return (
    <main className="flex flex-1 flex-col gap-8">
      <DashboardHeader>
        <div>
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <p className="text-muted-foreground mt-1">
            Add a new technical project to your portfolio
          </p>
        </div>
      </DashboardHeader>
      {children}
    </main>
  );
}
