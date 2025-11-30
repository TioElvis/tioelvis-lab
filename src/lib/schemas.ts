import z from "zod";
import { Languages, ProjectStatus } from "@prisma/client";

export const SignInZodSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export type SignInFormData = z.infer<typeof SignInZodSchema>;

export const ProjectZodSchema = z.object({
  title: z.string().min(1, "Insert the title for the project."),
  slug: z
    .string()
    .min(1, "Insert the slug for the section.")
    .transform((val) =>
      val
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "")
    ),
  description: z.string().min(1, "Insert the description for the project."),
  // Metadata
  languages: z
    .array(z.nativeEnum(Languages))
    .min(1, "Select at least one language."),
  repo_url: z.string().optional(),
  demo_url: z.string().optional(),
  tags: z.array(z.string()).optional(),
  // Status flags
  status: z.nativeEnum(ProjectStatus),
  featured: z.boolean().optional(),
});

export type ProjectFormData = z.infer<typeof ProjectZodSchema>;

export const ProjectListZodSchema = z.object({
  limit: z.number().min(1).max(6).default(6),
  page: z.number().min(1).optional().default(1),
  search: z.string().optional(),
  languages: z.array(z.nativeEnum(Languages)).optional(),
});

export type ProjectListData = z.infer<typeof ProjectListZodSchema>;
