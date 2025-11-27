import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditIcon } from "lucide-react";
import { Project } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

export function CardDashboardProject(project: Readonly<Project>) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="line-clamp-1 text-lg">
            {project.title}
          </CardTitle>
          <section className="flex gap-2">
            {project.featured && (
              <Badge
                variant={project.featured ? "default" : "secondary"}
                className="shrink-0">
                Featured
              </Badge>
            )}
            {project.status === "PUBLISHED" ? (
              <Badge className="shrink-0 bg-green-800">Published</Badge>
            ) : (
              <Badge variant="secondary" className="shrink-0">
                Draft
              </Badge>
            )}
          </section>
        </div>
        <CardDescription className="line-clamp-2 min-h-10">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.languages.slice(0, 3).map((lang) => (
            <Badge key={lang} variant="outline" className="text-[10px]">
              {lang}
            </Badge>
          ))}
          {project.languages.length > 3 && (
            <Badge variant="outline" className="text-[10px]">
              +{project.languages.length - 3}
            </Badge>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          Updated{" "}
          {formatDistanceToNow(new Date(project.updatedAt), {
            addSuffix: true,
          })}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/dashboard/project/${project.id}/edit`}>
            <EditIcon className="mr-2 h-4 w-4" />
            Edit Project
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
