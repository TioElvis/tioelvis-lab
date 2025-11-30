import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Project, Section } from "@prisma/client";
import { EditIcon, EyeIcon, PlusIcon } from "lucide-react";

interface Props {
  project: Readonly<Project & { sections: Readonly<Section>[] }>;
}

export function SectionsContent({ project }: Props) {
  return (
    <section className="py-4 flex flex-col-reverse xl:grid xl:grid-cols-8 gap-4">
      <div className="flex-1 xl:col-span-7 space-y-2">
        {project.sections.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No sections added yet. Click &#34;Add Section&#34; to create your
            first section.
          </p>
        )}
        {project.sections.length > 0 && (
          <Fragment>
            {project.sections.map((section) => {
              const isChild = section.parent_id !== null;

              return (
                <article
                  key={section.id}
                  className={cn(
                    "group flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent hover:border-accent-foreground/20 transition-all",
                    isChild && "ml-8 border-l-4 border-l-primary/30"
                  )}>
                  {isChild && (
                    <div className="flex items-center -ml-8">
                      <span className="w-6 h-px bg-border" />
                      <span className="w-2 h-2 rounded-full bg-primary/50" />
                    </div>
                  )}
                  <p className="text-sm font-semibold text-muted-foreground">
                    {section.order}
                  </p>
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl shrink-0">
                        {section.icon || "📄"}
                      </span>
                      <div>
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                          {section.title}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          /{section.slug}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon-sm">
                            <EyeIcon />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View Content</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon-sm">
                            <EditIcon />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Section</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </article>
              );
            })}
          </Fragment>
        )}
      </div>
      <Button className="flex-1 xl:col-span-1 h-fit">
        Add Section
        <PlusIcon className="h-4 w-4" />
      </Button>
    </section>
  );
}
