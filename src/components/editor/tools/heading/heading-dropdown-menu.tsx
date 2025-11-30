"use client";
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  HeadingIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Editor } from "@tiptap/react";
import { useHeading } from "./use-heading";
import { Button } from "@/components/ui/button";

interface Props {
  editor: Editor;
}

const HEADINGS = [
  {
    level: 1,
    Icon: Heading1Icon,
    label: "Heading 1",
  },
  {
    level: 2,
    Icon: Heading2Icon,
    label: "Heading 2",
  },
  {
    level: 3,
    Icon: Heading3Icon,
    label: "Heading 3",
  },
] as const;

export function HeadingDropdownMenu({ editor }: Readonly<Props>) {
  const { heading, execute } = useHeading({ editor });

  const GetCurrentIcon = (() => {
    const current = HEADINGS.find((h) => h.level === heading);

    if (current) {
      const Icon = current.Icon;
      return <Icon className="text-primary" />;
    }

    return <HeadingIcon />;
  })();

  return (
    <DropdownMenu modal={false}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button className="cursor-pointer" variant="ghost" size="icon-sm">
              {GetCurrentIcon}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Heading</TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        {HEADINGS.map(({ level, Icon, label }) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => execute(level)}
            key={level}>
            <Icon className={cn(heading === level && "text-primary")} />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
