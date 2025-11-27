"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { client } from "@/lib/client";
import { Languages } from "@prisma/client";
import { LANGUAGES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDebounce } from "@/hooks/use-debounce";
import { DashboardHeader } from "../components/dashboard-header";
import { CardDashboardProject } from "./components/card-dashboard-project";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CardDashboardProjectSkeleton } from "./components/card-dashboard-project-skeleton";

export default function ProjectsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<Languages[]>([]);

  const isMobile = useIsMobile();

  const debouncedSearch = useDebounce(search, 500);

  const query = useQuery({
    queryKey: ["projects", page, debouncedSearch, selectedLanguages],
    queryFn: async () => {
      const response = await client.project.list.$get({
        limit: 6,
        page: page,
        search: debouncedSearch,
        languages: selectedLanguages,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      return await response.json();
    },
  });

  const handleLanguageChange = (value: string[]) => {
    setSelectedLanguages(value as Languages[]);
    setPage(1);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <DashboardHeader className="xl:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        {!isMobile && (
          <Button asChild>
            <Link href="/dashboard/projects/new">
              <PlusIcon className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        )}
      </DashboardHeader>
      {/* Filters */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-8"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FilterIcon className="h-4 w-4" />
            <span>Filter by Language:</span>
          </div>
          <ToggleGroup
            type="multiple"
            value={selectedLanguages}
            onValueChange={handleLanguageChange}
            className="flex flex-wrap justify-start gap-2">
            {LANGUAGES.map((lang) => (
              <ToggleGroupItem
                key={lang.value}
                value={lang.value}
                aria-label={`Toggle ${lang.value}`}
                className="h-8 px-3 text-xs cursor-pointer">
                <span
                  className={cn(
                    `inline-block h-3 w-3 rounded-full ${lang.color}`
                  )}
                />
                {lang.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      {/* Content */}
      {query.isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <CardDashboardProjectSkeleton key={i} />
          ))}
        </div>
      ) : query.isError ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-destructive mb-4">Failed to load projects</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      ) : query.data?.projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-muted/10">
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or create a new project.
          </p>
          <Button asChild variant="outline">
            <Link href="/dashboard/projects/new">Create Project</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {query.data?.projects.map((project) => (
              <CardDashboardProject key={project.id} {...project} />
            ))}
          </div>
          {/* Pagination */}
          {query.data?.pagination && query.data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium">
                Page {page} of {query.data.pagination.totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer"
                onClick={() =>
                  setPage((p) =>
                    Math.min(query.data.pagination.totalPages, p + 1)
                  )
                }
                disabled={page === query.data.pagination.totalPages}>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
