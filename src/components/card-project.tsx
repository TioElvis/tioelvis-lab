import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "@/generated/prisma/client";

export function CardProject(project: Readonly<Project>) {
  return (
    <Card className="group relative">
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          {project.languages.map((language, j) => (
            <Badge
              key={j}
              className="bg-primary/10 text-primary text-xs font-medium">
              {language}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="mb-4 text-xl font-heading font-bold group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, j) => (
            <span
              key={j}
              className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex justify-start items-start">
          <Button
            variant="link"
            className="cursor-pointer group-hover:translate-x-2 transition-transform"
            asChild>
            <Link href={`/projects/${project.slug}`}>
              Read More
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
