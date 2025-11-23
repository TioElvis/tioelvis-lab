"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Editor } from "@tiptap/react";
import { TextQuoteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlockquote } from "./use-blockquote";

interface Props {
  editor: Editor;
}

export function BlockquoteButton({ editor }: Readonly<Props>) {
  const { isActive, isDisabled, execute } = useBlockquote({ editor });

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
          <TextQuoteIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Blockquote</TooltipContent>
    </Tooltip>
  );
}
