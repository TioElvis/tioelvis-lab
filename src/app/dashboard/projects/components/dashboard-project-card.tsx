import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import { Project } from "@prisma/client";
import { LANGUAGES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

export function DashboardProjectCard(project: Readonly<Project>) {
  return (
    <Card className="justify-between transition-all group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{project.title}</CardTitle>
          <div className="flex items-center gap-4">
            <Badge
              variant="secondary"
              className={cn(project.status === "PUBLISHED" && "bg-green-800")}>
              {project.status}
            </Badge>
            {project.featured && <Badge>Featured</Badge>}
          </div>
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {project.languages.map((language) => {
            const v = LANGUAGES.find((e) => e.value === language)!;
            return (
              <Badge key={language} variant="secondary">
                <span className={cn(`w-3 h-3 rounded-full ${v.color}`)} />
                {v.label}
              </Badge>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <p className="text-xs text-muted-foreground">
          Updated{" "}
          {formatDistanceToNow(new Date(project.updatedAt), {
            addSuffix: true,
          })}
        </p>
        <Button
          asChild
          variant="secondary"
          className="w-full group-hover:text-primary">
          <Link href={`/dashboard/projects/${project.slug}`}>
            Edit Project
            <EditIcon className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
