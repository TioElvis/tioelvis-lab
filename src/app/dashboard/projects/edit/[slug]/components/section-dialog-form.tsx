"use client";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { client } from "@/lib/client";
import { Section } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ICONS_OPTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect, useState } from "react";
import { SectionFormData, SectionZodSchema } from "@/lib/schemas";
import { PlusIcon, SectionIcon, ChevronsUpDown, CheckIcon } from "lucide-react";

interface Props {
  project_id: string;
  list_sections: Array<Section>;
}

export function SectionDialogForm({
  project_id,
  list_sections,
}: Readonly<Props>) {
  const [dialog, setDialog] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);

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

  const onSubmit = (data: SectionFormData) => mutation.mutate(data);

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <DialogTrigger asChild>
        <Button className="flex-1 xl:col-span-1">
          Add Section
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-96">
        <DialogHeader>
          <DialogTitle>Create New Section</DialogTitle>
          <DialogDescription>
            Add a new section to organize your project documentation. You can
            create a parent section or nest it under an existing one.
          </DialogDescription>
        </DialogHeader>
        <hr />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Getting Started" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="getting-started" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <TooltipProvider>
                        <div className="flex flex-wrap justify-start gap-2">
                          {ICONS_OPTIONS.map((icon) => {
                            const isSelected = field.value === icon.emoji;
                            return (
                              <Tooltip key={icon.label}>
                                <TooltipTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => field.onChange(icon.emoji)}
                                    className={cn(
                                      isSelected && "ring-primary ring-2"
                                    )}
                                    aria-label={icon.label}>
                                    {icon.emoji}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>{icon.label}</TooltipContent>
                              </Tooltip>
                            );
                          })}
                        </div>
                      </TooltipProvider>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="parent_id"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Parent Section (Optional)</FormLabel>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCombobox}
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}>
                            {field.value ? (
                              <Fragment>
                                {
                                  list_sections.find(
                                    (section) => section.id === field.value
                                  )?.icon
                                }
                                {
                                  list_sections.find(
                                    (section) => section.id === field.value
                                  )?.title
                                }
                              </Fragment>
                            ) : (
                              "Select parent section..."
                            )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] p-0">
                        <Command>
                          <CommandInput placeholder="Search section..." />
                          <CommandList>
                            <CommandEmpty>No section found.</CommandEmpty>
                            <CommandGroup>
                              <CommandItem
                                value="none"
                                className="cursor-pointer"
                                onSelect={() => {
                                  field.onChange(null);
                                  setOpenCombobox(false);
                                }}>
                                {field.value === null && <CheckIcon />}
                                None (Root Section)
                              </CommandItem>
                              {list_sections.map((section) => (
                                <CommandItem
                                  key={section.id}
                                  value={section.title}
                                  className="cursor-pointer"
                                  onSelect={() => {
                                    field.onChange(section.id);
                                    setOpenCombobox(false);
                                  }}>
                                  {field.value === section.id && <CheckIcon />}
                                  {section.icon} {section.title}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="w-full">
              {mutation.isPending ? (
                "Creating..."
              ) : (
                <Fragment>
                  Create Section <SectionIcon />
                </Fragment>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
