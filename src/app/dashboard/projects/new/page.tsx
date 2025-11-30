"use client";
import { toast } from "sonner";
import { client } from "@/lib/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ProjectStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectForm } from "../components/project-form";
import { ProjectFormData, ProjectZodSchema } from "@/lib/schemas";

export default function Page() {
  const router = useRouter();

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectZodSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      languages: [],
      repo_url: "",
      demo_url: "",
      tags: [],
      status: ProjectStatus.DRAFT,
      featured: false,
    },
    mode: "onSubmit",
  });

  const mutation = useMutation({
    mutationFn: async (values: ProjectFormData) => {
      const response = await client.project.create.$post(values);

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      return await response.json();
    },
    onSuccess: (response) => {
      toast.success("Project created successfully");
      router.push(`/dashboard/projects/edit/${response.slug}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return (
    <ProjectForm
      form={form}
      onSubmit={onSubmit}
      isSubmitting={mutation.isPending}
    />
  );
}
