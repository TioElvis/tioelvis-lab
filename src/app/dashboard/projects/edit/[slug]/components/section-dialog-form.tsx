"use client";
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
import { Section } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ICONS_OPTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { SectionFormData } from "@/lib/schemas";
import { Fragment, useEffect, useState } from "react";
import { PlusIcon, SectionIcon, ChevronsUpDown, CheckIcon } from "lucide-react";

interface Props {
  list_sections: Array<Section>;
  dialog: boolean;
  setDialog: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<SectionFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  submitButtonText?: string;
  submitButtonLoadingText?: string;
}

export function SectionDialogForm({
  list_sections,
  dialog,
  setDialog,
  form,
  onSubmit,
  isSubmitting,
  submitButtonText = "Create Section",
  submitButtonLoadingText = "Creating...",
}: Readonly<Props>) {
  const [openCombobox, setOpenCombobox] = useState(false);

  useEffect(() => {
    if (!dialog) {
      form.reset();
    }
  }, [form, dialog]);

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
          <form onSubmit={onSubmit} className="space-y-8">
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
              {isSubmitting ? (
                submitButtonLoadingText
              ) : (
                <Fragment>
                  {submitButtonText}
                  <SectionIcon />
                </Fragment>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
