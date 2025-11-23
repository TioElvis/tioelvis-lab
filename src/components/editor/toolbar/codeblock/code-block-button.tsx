"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Editor } from "@tiptap/react";
import { CodeIcon } from "lucide-react";
import { useCodeBlock } from "./use-code-block";
import { Button } from "@/components/ui/button";

interface Props {
  editor: Editor;
}

export function CodeBlockButton({ editor }: Readonly<Props>) {
  const { isActive, isDisabled, execute } = useCodeBlock({ editor });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          className="cursor-pointer"
          size="icon-sm"
          variant={isActive ? "default" : "ghost"}
          onClick={execute}
          disabled={isDisabled}>
          <CodeIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Code Block</TooltipContent>
    </Tooltip>
  );
}
