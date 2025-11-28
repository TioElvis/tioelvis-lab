"use client";
import { useMemo } from "react";
import { client } from "@/lib/client";
import { useParams } from "next/navigation";
import { ProjectStatus } from "@prisma/client";
import { ProjectFormData } from "@/lib/schemas";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SlugProjectContent } from "./components/slug-project-content";

export default function Page() {
  const { slug } = useParams();

  const query = useQuery({
    queryKey: ["project", slug],
    enabled: !!slug,
    queryFn: async () => {
      const slugParam = Array.isArray(slug) ? slug[0] : slug;

      if (!slugParam) {
        throw new Error("Missing slug");
      }

      const response = await client.project.getBySlug.$get({ slug: slugParam });

      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      return await response.json();
    },
  });

  const defaultValues: ProjectFormData = useMemo(() => {
    if (!query.data) {
      return {
        title: "",
        slug: "",
        description: "",
        languages: [],
        repo_url: "",
        demo_url: "",
        tags: [],
        status: ProjectStatus.DRAFT,
        featured: false,
      };
    }

    return {
      title: query.data.title,
      slug: query.data.slug,
      description: query.data.description,
      languages: query.data.languages,
      repo_url: query.data.repo_url as string,
      demo_url: query.data.demo_url as string,
      tags: query.data.tags,
      status: query.data.status,
      featured: query.data.featured,
    };
  }, [query.data]);

  return (
    <div className="flex-1">
      {!query.isLoading && query.data && (
        <SlugProjectContent
          defaultValues={defaultValues}
          project_id={query.data.id}
        />
      )}
      {query.isLoading && (
        <div className="grid xl:grid-cols-6 gap-4 py-8">
          <section className="xl:col-span-3">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
              </CardHeader>
              <CardContent className="space-y-8">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="min-h-72 w-full" />
              </CardContent>
            </Card>
          </section>
          <section className="xl:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
              </CardHeader>
              <CardContent className="space-y-8">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-6 w-full" />
              </CardContent>
            </Card>
          </section>
        </div>
      )}
    </div>
  );
}
