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
import { Button } from "@/components/ui/button";
import { HeadingLevel, useHeading } from "./use-heading";

interface Props {
  editor: Editor;
}

export function HeadingButton({ editor }: Readonly<Props>) {
  const { heading, execute } = useHeading({ editor });

  const HEADINGS = [
    {
      level: 1 as HeadingLevel,
      Icon: Heading1Icon,
      label: "Heading 1",
    },
    {
      level: 2 as HeadingLevel,
      Icon: Heading2Icon,
      label: "Heading 2",
    },
    {
      level: 3 as HeadingLevel,
      Icon: Heading3Icon,
      label: "Heading 3",
    },
  ];

  const getCurrentIcon = () => {
    const current = HEADINGS.find((h) => h.level === heading);

    if (current) {
      const Icon = current.Icon;
      return <Icon className="text-primary" />;
    }

    return <HeadingIcon />;
  };

  return (
    <DropdownMenu modal={false}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button className="cursor-pointer" variant="ghost" size="icon-sm">
              {getCurrentIcon()}
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
