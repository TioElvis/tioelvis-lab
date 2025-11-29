"use client";
import { toast } from "sonner";
import { client } from "@/lib/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectForm } from "../../components/project-form";
import { ProjectFormData, ProjectZodSchema } from "@/lib/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  project_id: string;
  defaultValues: ProjectFormData;
}

export function SlugProjectContent({ project_id, defaultValues }: Props) {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectZodSchema),
    defaultValues: defaultValues,
    mode: "onSubmit",
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: ProjectFormData) => {
      const response = await client.project.update.$post({
        ...values,
        id: project_id,
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project"] });

      toast.success("Project updated successfully");
      router.replace(`/dashboard/projects/${data.slug}`);
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
      submitButtonText="Edit"
      submitButtonLoadingText="Editing..."
    />
  );
}
