"use client";
import { useMemo } from "react";
import { ProjectFormData } from "@/lib/schemas";
import { ProjectContent } from "./project-content";
import { Project, ProjectStatus } from "@prisma/client";

export function DetailsContent(project: Readonly<Project>) {
  const defaultValues: ProjectFormData = useMemo(() => {
    if (!project) {
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
      title: project.title,
      slug: project.slug,
      description: project.description,
      languages: project.languages,
      repo_url: project.repo_url as string,
      demo_url: project.demo_url as string,
      tags: project.tags,
      status: project.status,
      featured: project.featured,
    };
  }, [project]);

  return (
    <ProjectContent defaultValues={defaultValues} project_id={project.id} />
  );
}
