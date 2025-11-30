"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { client } from "@/lib/client";
import { Languages } from "@prisma/client";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { LANGUAGES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DashboardProjectCard } from "./components/dashboard-project-card";

export default function Page() {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [languages, setLanguages] = useState<Array<Languages>>([]);

  const search = useDebounce(input, 500);

  const router = useRouter();

  const query = useQuery({
    queryKey: ["projects", page, search, languages],
    queryFn: async () => {
      const response = await client.project.list.$get({
        limit: 6,
        page,
        search,
        languages,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      return await response.json();
    },
  });

  const toggleLanguage = (language: Languages) => {
    setPage(1);

    setLanguages((current) => {
      if (current.includes(language)) {
        return current.filter((e) => e !== language);
      } else {
        return [...current, language];
      }
    });
  };

  const totalPages = query.data?.pagination.totalPages || 1;
  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  return (
    <Fragment>
      <div className="flex flex-wrap gap-4">
        {LANGUAGES.map((language) => {
          return (
            <Toggle
              variant="outline"
              key={language.value}
              onClick={() => toggleLanguage(language.value)}>
              <span className={cn(`w-3 h-3 rounded-full ${language.color}`)} />
              {language.label}
            </Toggle>
          );
        })}
      </div>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
        <Input
          placeholder="Search projects..."
          className="pl-8"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setPage(1);
          }}
        />
      </div>
      {query.error && (
        <div className="grid place-content-center my-24">
          <p className="text-destructive mb-4">Failed to load projects</p>
          <Button variant="outline" onClick={() => router.refresh()}>
            Try Again
          </Button>
        </div>
      )}
      <div className="grid xl:grid-cols-3 xl:grid-rows-2 gap-4">
        {query.isLoading && (
          <Fragment>
            {[...Array(6)].map((_, i) => {
              return (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full mb-4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </Fragment>
        )}
        {query.data && (
          <Fragment>
            {query.data.projects.map((project) => {
              return <DashboardProjectCard key={project.id} {...project} />;
            })}
          </Fragment>
        )}
      </div>
      {query.data && query.data.projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-muted/10">
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or create a new project.
          </p>
          <Button variant="outline" asChild>
            <Link href="/dashboard/projects/new">Create Project</Link>
          </Button>
        </div>
      )}
      {query.data && query.data.projects.length > 0 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!canGoPrevious || query.isLoading}>
            <ChevronLeft />
            Previous
          </Button>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
          </div>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={!canGoNext || query.isLoading}>
            Next
            <ChevronRight />
          </Button>
        </div>
      )}
    </Fragment>
  );
}
