"use client";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { client } from "@/lib/client";
import { Fragment, useState } from "react";
import { LANGUAGES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ProjectSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Languages, ProjectStatus } from "@prisma/client";
import { CheckIcon, PlaneIcon, PlusIcon, XIcon } from "lucide-react";
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  const [inputTag, setInputTag] = useState("");

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ProjectSchema),
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
  });

  const watchedLanguages = useWatch({
    control: form.control,
    name: "languages",
    defaultValue: [],
  });

  const watchedTags = useWatch({
    control: form.control,
    name: "tags",
    defaultValue: [],
  });

  const addTag = (rawTag: string) => {
    const tag = rawTag.trim();
    if (tag.length === 0) return;

    const currentTags: string[] = form.getValues("tags") || [];
    const lower = tag.toLowerCase();
    const hasDuplicate = currentTags.some((t) => t.toLowerCase() === lower);
    if (hasDuplicate) return;

    form.setValue("tags", [...currentTags, tag], {
      shouldDirty: true,
      shouldValidate: true,
    });
    setInputTag("");
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags: string[] = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((t) => t !== tagToRemove),
      { shouldDirty: true, shouldValidate: true }
    );
  };

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof ProjectSchema>) => {
      const response = await client.project.create.$post(values);

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      return await response.json();
    },
    onSuccess: (response) => {
      toast.success("Project created successfully");
      router.push(`/dashboard/projects/${response.slug}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return (
    <section className="flex flex-col gap-8">
      <DashboardHeader>
        <div>
          <h1 className="text-xl md:text-3xl font-bold">Create New Project</h1>
          <p className="text-muted-foreground mt-1">
            Add a new technical project
          </p>
        </div>
      </DashboardHeader>
      <Form {...form}>
        <form
          className="flex-1 space-y-8 xl:grid xl:grid-cols-6 xl:gap-8 xl:space-y-0"
          onSubmit={onSubmit}>
          <section className="xl:col-span-4">
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
                            placeholder="Describe the project"
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
          <section className="xl:col-span-2 space-y-8">
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
                        defaultValue={field.value}>
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Languages</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {LANGUAGES.map((lang) => (
                          <Badge
                            key={lang.value}
                            variant={
                              field.value?.includes(lang.value)
                                ? "secondary"
                                : "outline"
                            }
                            className="cursor-pointer flex gap-2"
                            onClick={() => {
                              const current = field.value || [];
                              const updated = current.includes(lang.value)
                                ? current.filter((l) => l !== lang.value)
                                : [...current, lang.value];
                              field.onChange(updated);
                            }}>
                            <span
                              className={cn(
                                `inline-block h-3 w-3 rounded-full ${lang.color}`
                              )}
                            />
                            {lang.label}
                            {watchedLanguages.includes(
                              lang.value as Languages
                            ) && <CheckIcon />}
                          </Badge>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <Label htmlFor="tag">Tags</Label>
                  <div className="flex gap-4">
                    <Input
                      id="tag"
                      name="tag"
                      placeholder="Add tag and press Enter or click +"
                      value={inputTag}
                      onChange={(e) => setInputTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag(inputTag);
                        }
                      }}
                      aria-describedby="tags-help"
                    />
                    <Button
                      type="button"
                      size="icon"
                      onClick={() => addTag(inputTag)}
                      className="cursor-pointer"
                      aria-label="Add tag">
                      <PlusIcon />
                    </Button>
                  </div>
                  <p id="tags-help" className="text-sm text-muted-foreground">
                    Tags are case-insensitive and duplicates are ignored.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {watchedTags?.map((tag: string) => {
                      return (
                        <div
                          key={tag}
                          className="inline-flex items-center space-x-2 rounded-full bg-muted px-3 py-1 text-sm">
                          <span>{tag}</span>
                          <XIcon
                            className="w-4 h-4 cursor-pointer"
                            onClick={() => removeTag(tag)}
                          />
                        </div>
                      );
                    })}
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
                          className="cursor-pointer"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Button
              className="w-full cursor-pointer"
              disabled={mutation.isPending}>
              {mutation.isPending ? (
                "Creating..."
              ) : (
                <Fragment>
                  Publish <PlaneIcon />
                </Fragment>
              )}
            </Button>
          </section>
        </form>
      </Form>
    </section>
  );
}
