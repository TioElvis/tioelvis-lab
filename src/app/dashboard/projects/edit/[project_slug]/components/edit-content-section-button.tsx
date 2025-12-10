"use client";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  project_slug: string;
  section_slug: string;
}

export function EditSectionContentButton({
  project_slug,
  section_slug,
}: Readonly<Props>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon-sm" asChild>
          <Link href={`${project_slug}/content/${section_slug}`}>
            <EyeIcon />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Edit Content</TooltipContent>
    </Tooltip>
  );
}
