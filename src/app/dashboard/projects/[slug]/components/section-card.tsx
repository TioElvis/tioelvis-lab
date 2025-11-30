import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Section } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { EditIcon, EyeIcon } from "lucide-react";

export function SectionCard(section: Readonly<Section>) {
  const isChild = section.parent_id !== null;

  return (
    <article
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
          <span className="text-xl">{section.icon}</span>
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
}
