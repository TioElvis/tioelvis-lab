import { z } from "zod";
import { Languages, ProjectStatus } from "@prisma/client";

export const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase, alphanumeric, and hyphens only"
    ),
  description: z.string().min(1, "Description is required"),
  // Metadata
  languages: z
    .array(z.nativeEnum(Languages))
    .min(1, "Select at least one language"),
  repo_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  demo_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  tags: z.array(z.string()).optional(),
  // Status flags
  status: z.nativeEnum(ProjectStatus).optional().default(ProjectStatus.DRAFT),
  featured: z.boolean().optional().default(false),
});
