"use client";
import { toast } from "sonner";
import { client } from "@/lib/client";
import { PlusIcon } from "lucide-react";
import { Section } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect, useState } from "react";
import { SectionDialogForm } from "./section-dialog-form";
import { SectionFormData, SectionZodSchema } from "@/lib/schemas";

interface Props {
  project_id: string;
  list_sections: Array<Section>;
}

export function CreateSectionButton({
  project_id,
  list_sections,
}: Readonly<Props>) {
  const [dialog, setDialog] = useState(false);

  const router = useRouter();

  const form = useForm<SectionFormData>({
    resolver: zodResolver(SectionZodSchema),
    defaultValues: {
      title: "",
      slug: "",
      icon: undefined,
      parent_id: null,
    },
  });

  useEffect(() => {
    if (!dialog) {
      form.reset();
    }
  }, [form, dialog]);

  const mutation = useMutation({
    mutationFn: async (data: SectionFormData) => {
      const response = await client.section.create.$post({
        project_id,
        ...data,
      });

      if (!response.ok) {
        throw new Error("Failed to create section");
      }

      return await response.json();
    },
    onSuccess: () => {
      form.reset();
      setDialog(false);
      toast.success("Section created successfully!");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return (
    <Fragment>
      <Button className="flex-1 xl:col-span-1" onClick={() => setDialog(true)}>
        Add Section
        <PlusIcon />
      </Button>
      <SectionDialogForm
        list_sections={list_sections}
        dialog={dialog}
        setDialog={setDialog}
        form={form}
        onSubmit={onSubmit}
        isSubmitting={mutation.isPending}
      />
    </Fragment>
  );
}
