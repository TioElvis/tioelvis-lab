"use client";
import z from "zod";
import {
  CheckIcon,
  ChevronDownIcon,
  PlaneIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ProjectSchema } from "@/lib/schemas";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Languages, ProjectStatus } from "@/generated/prisma/enums";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LANGUAGES = [
  { value: "JAVASCRIPT", label: "JavaScript", color: "bg-yellow-500" },
  { value: "TYPESCRIPT", label: "TypeScript", color: "bg-blue-500" },
  { value: "PYTHON", label: "Python", color: "bg-green-500" },
  { value: "GO", label: "Go", color: "bg-cyan-500" },
  { value: "JAVA", label: "Java", color: "bg-orange-500" },
  { value: "CPP", label: "C++", color: "bg-purple-500" },
  { value: "C", label: "C", color: "bg-gray-500" },
  { value: "RUST", label: "Rust", color: "bg-red-500" },
] as const;

export default function Page() {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [languages, setLanguages] = useState<Array<Languages>>([]);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      slug: "",
      repo_url: "",
      demo_url: "",
      status: ProjectStatus.DRAFT,
      featured: false,
      description: "",
    },
    mode: "onSubmit",
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof ProjectSchema>) => {
      const response = await client.project.createProject.$post({
        ...values,
        tags,
        languages,
      });

      return await response.json();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create project. Please try again.");
    },
    onSuccess: (data) => {
      toast.success("Project created successfully!");
      form.reset();
      setTags([]);
      setLanguages([]);
      router.push(`/dashboard/projects/${data.slug}`);
    },
  });

  const onSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return (
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
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g, REST API with Express"
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
                      <FormLabel>Project Slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g, rest-api-with-express"
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
                      <FormLabel>Project Description</FormLabel>
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
                        <SelectTrigger className="cursor-pointer w-full">
                          <SelectValue placeholder="Select project status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          className="cursor-pointer"
                          value={ProjectStatus.DRAFT}>
                          Draft
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer"
                          value={ProjectStatus.PUBLISHED}>
                          Published
                        </SelectItem>
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
              <div className="space-y-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer justify-between text-sm text-muted-foreground">
                      Select Languages{" "}
                      <ChevronDownIcon className="opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {LANGUAGES.map((lang) => {
                      return (
                        <DropdownMenuItem
                          key={lang.value}
                          className="cursor-pointer"
                          onClick={() => {
                            if (languages.includes(lang.value as Languages)) {
                              setLanguages(
                                languages.filter((l) => l !== lang.value)
                              );
                            } else {
                              setLanguages([
                                ...languages,
                                lang.value as Languages,
                              ]);
                            }
                          }}>
                          <span
                            className={cn(
                              `inline-block h-3 w-3 mr-2 rounded-full ${lang.color}`
                            )}
                          />
                          {lang.label}
                          {languages.includes(lang.value as Languages) && (
                            <CheckIcon />
                          )}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
                {languages.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No languages selected
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => {
                      const langData = LANGUAGES.find((l) => l.value === lang);
                      if (!langData) return null;
                      return (
                        <div
                          key={lang}
                          className="inline-flex items-center space-x-2 rounded-full bg-muted px-3 py-1 text-sm">
                          <span
                            className={cn(
                              `inline-block h-3 w-3 rounded-full ${langData.color}`
                            )}
                          />
                          <span>{langData.label}</span>
                          <XIcon
                            className="w-4 h-4 cursor-pointer"
                            onClick={() => {
                              if (languages.includes(lang)) {
                                setLanguages(
                                  languages.filter((l) => l !== lang)
                                );
                              }
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag">Tags</Label>
                <div className="flex gap-4">
                  <Input
                    id="tag"
                    name="tag"
                    placeholder="Add tag..."
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                  <Button
                    type="button"
                    size="icon"
                    onClick={() => {
                      if (tag.length === 0) {
                        return;
                      }
                      if (tags.includes(tag)) {
                        return;
                      } else {
                        setTag("");
                        setTags([...tags, tag]);
                      }
                    }}
                    className="cursor-pointer">
                    <PlusIcon />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    return (
                      <div
                        key={tag}
                        className="inline-flex items-center space-x-2 rounded-full bg-muted px-3 py-1 text-sm">
                        <span>{tag}</span>
                        <XIcon
                          className="w-4 h-4 cursor-pointer"
                          onClick={() => {
                            if (tags.includes(tag)) {
                              setTags(tags.filter((t) => t !== tag));
                            }
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
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
  );
}
