"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
import { useWatch } from "react-hook-form";
import { LANGUAGES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectFormData } from "@/lib/schemas";
import type { UseFormReturn } from "react-hook-form";
import { Languages, ProjectStatus } from "@prisma/client";
import { useKeyboardAware } from "@/hooks/use-keyboard-aware";
import { CheckIcon, PlaneIcon, PlusIcon, XIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  form: UseFormReturn<ProjectFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  submitButtonText?: string;
  submitButtonLoadingText?: string;
}

export function ProjectForm({
  form,
  onSubmit,
  isSubmitting,
  submitButtonText = "Publish",
  submitButtonLoadingText = "Creating...",
}: Props) {
  const [tag, setTag] = useState("");
  const containerRef = useKeyboardAware();

  const languages = useWatch({
    control: form.control,
    name: "languages",
  });

  const toggleLanguage = (language: Languages) => {
    let current = languages;

    if (current.includes(language)) {
      current = current.filter((e) => e !== language);
    } else {
      form.clearErrors("languages");
      current.push(language);
    }

    form.setValue("languages", current);
  };

  const tags = useWatch({
    control: form.control,
    name: "tags",
  });

  const toggleTag = (tag: string) => {
    let current = tags || [];

    if (current?.includes(tag.toLowerCase())) {
      current = current.filter((e) => e !== tag.toLowerCase());
    } else {
      current.push(tag.toLowerCase());
    }

    setTag("");
    form.setValue("tags", current);
  };

  return (
    <main className="flex-1 py-4" ref={containerRef}>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 xl:grid-cols-6 gap-4">
          <section className="xl:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="REST API with Express"
                            {...field}
                          />
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
                          <Input
                            placeholder="rest-api-with-express"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-72"
                            placeholder="A REST API built with Express.js and TypeScript, featuring JWT authentication, CRUD operations, and comprehensive documentation."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <hr />
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="repo_url"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>Repository URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://github.com/your-repo"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="demo_url"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>Demo URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://demo.example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </section>
          <section className="xl:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(ProjectStatus).map((status) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={status as string}
                              value={status as string}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Only published projects are visible publicly
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="languages"
                  render={() => {
                    return (
                      <FormItem>
                        <FormLabel>Languages</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {LANGUAGES.map((language) => {
                            return (
                              <Badge
                                key={language.value}
                                variant={
                                  languages.includes(language.value)
                                    ? "secondary"
                                    : "outline"
                                }
                                className="cursor-pointer"
                                onClick={() => toggleLanguage(language.value)}>
                                <span
                                  className={cn(
                                    `w-3 h-3 rounded-full ${language.color}`
                                  )}
                                />
                                {language.label}
                                {languages.includes(language.value) && (
                                  <CheckIcon className="ml-1 w-4 h-4" />
                                )}
                              </Badge>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div className="space-y-2">
                  <Label htmlFor="tag">Tags</Label>
                  <div className="flex gap-4">
                    <Input
                      id="tag"
                      name="tag"
                      placeholder="Add tag and press Enter or click +"
                      value={tag}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          toggleTag(tag);
                        }
                      }}
                      onChange={(e) => setTag(e.target.value)}
                    />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          size="icon"
                          onClick={() => toggleTag(tag)}>
                          <PlusIcon />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Add tag</TooltipContent>
                    </Tooltip>
                  </div>
                  <p id="tags-help" className="text-sm text-muted-foreground">
                    Tags are case-insensitive and duplicates are ignored.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {tags &&
                      tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-sm">
                          {tag}
                          <button type="button" onClick={() => toggleTag(tag)}>
                            <XIcon className="w-4 h-4" />
                          </button>
                        </Badge>
                      ))}
                  </div>
                </div>
                <hr />
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel>Feature this project</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Button className="w-full cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? (
                submitButtonLoadingText
              ) : (
                <Fragment>
                  {submitButtonText} <PlaneIcon />
                </Fragment>
              )}
            </Button>
          </section>
        </form>
      </Form>
    </main>
  );
}
