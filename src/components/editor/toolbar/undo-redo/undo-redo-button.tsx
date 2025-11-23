"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Redo2Icon, Undo2Icon } from "lucide-react";
import { UndoRedoActions, useUndoRedo } from "./use-undo-redo";

interface Props {
  editor: Editor;
  action: UndoRedoActions;
}

export function UndoRedoButton({ action, editor }: Readonly<Props>) {
  const { canExecute, execute } = useUndoRedo({ action, editor });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          className="cursor-pointer"
          size="icon-sm"
          variant="ghost"
          disabled={!canExecute}
          onClick={execute}>
          {action === "undo" ? <Undo2Icon /> : <Redo2Icon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{action === "undo" ? "Undo" : "Redo"}</TooltipContent>
    </Tooltip>
  );
}
