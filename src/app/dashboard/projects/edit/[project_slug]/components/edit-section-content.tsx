"use client";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { client } from "@/lib/client";
import { EditIcon } from "lucide-react";
import { Section } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Fragment, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionDialogForm } from "./section-dialog-form";
import { SectionFormData, SectionZodSchema } from "@/lib/schemas";

interface Props {
  project_id: string;
  section_id: string;
  defaultValues: SectionFormData;
  list_sections: Array<Section>;
}

export default function EditSectionContent({
  project_id,
  section_id,
  defaultValues,
  list_sections,
}: Readonly<Props>) {
  const [dialog, setDialog] = useState(false);

  const form = useForm<SectionFormData>({
    resolver: zodResolver(SectionZodSchema),
    defaultValues: defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: SectionFormData) => {
      const response = await client.section.update.$post({
        section_id,
        project_id,
        ...values,
      });

      if (!response.ok) {
        throw new Error("Failed to update section");
      }

      return response.json();
    },
    onSuccess: () => {
      setDialog(false);
      router.refresh();
      toast.success("Section edited successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return (
    <Fragment>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setDialog(true)}>
            <EditIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit Section</TooltipContent>
      </Tooltip>
      <SectionDialogForm
        list_sections={list_sections}
        dialog={dialog}
        setDialog={setDialog}
        form={form}
        onSubmit={onSubmit}
        isSubmitting={mutation.isPending}
        submitButtonText="Edit section"
        submitButtonLoadingText="Editing..."
      />
    </Fragment>
  );
}
