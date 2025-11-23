import z from "zod";
import { ProjectStatus } from "@/generated/prisma/enums";

export const ProjectSchema = z.object({
  title: z.string().min(3).max(100),
  slug: z.string().min(3).max(100),
  description: z.string().min(3),
  repo_url: z.string().optional(),
  demo_url: z.string().optional(),
  status: z.nativeEnum(ProjectStatus),
  featured: z.boolean().optional(),
});
