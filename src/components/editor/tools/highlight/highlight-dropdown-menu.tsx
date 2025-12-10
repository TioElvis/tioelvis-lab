"use client";
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
import { useHighlight } from "./use-highlight";
import { Button } from "@/components/ui/button";
import { BanIcon, HighlighterIcon } from "lucide-react";

interface Props {
  editor: Editor;
}

const colors = [
  {
    name: "Yellow",
    value: "rgba(254, 240, 138, 0.5)",
    preview: "bg-yellow-200/50",
  },
  {
    name: "Green",
    value: "rgba(187, 247, 208, 0.5)",
    preview: "bg-green-200/50",
  },
  {
    name: "Blue",
    value: "rgba(191, 219, 254, 0.5)",
    preview: "bg-blue-200/50",
  },
  {
    name: "Pink",
    value: "rgba(251, 207, 232, 0.5)",
    preview: "bg-pink-200/50",
  },
  {
    name: "Purple",
    value: "rgba(233, 213, 255, 0.5)",
    preview: "bg-purple-200/50",
  },
  {
    name: "Orange",
    value: "rgba(254, 215, 170, 0.5)",
    preview: "bg-orange-200/50",
  },
];

export function HighlightDropdownMenu({ editor }: Readonly<Props>) {
  const { isActive, activeColor, setHighlight, removeHighlight } = useHighlight(
    { editor }
  );

  return (
    <DropdownMenu modal={false}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              className="cursor-pointer"
              variant={isActive ? "default" : "ghost"}
              size="icon-sm">
              <HighlighterIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Highlight</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="flex">
        {colors.map((color) => {
          return (
            <Tooltip key={color.name}>
              <TooltipTrigger asChild>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setHighlight(color.value);
                  }}>
                  <span
                    className={cn(
                      "h-6 w-6 rounded-full",
                      color.preview,
                      activeColor === color.value &&
                        "ring-2 ring-offset-2 ring-offset-background ring-border"
                    )}
                  />
                </DropdownMenuItem>
              </TooltipTrigger>
              <TooltipContent>{color.name}</TooltipContent>
            </Tooltip>
          );
        })}
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => removeHighlight()}>
              <BanIcon />
            </DropdownMenuItem>
          </TooltipTrigger>
          <TooltipContent>Remove Highlight</TooltipContent>
        </Tooltip>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
