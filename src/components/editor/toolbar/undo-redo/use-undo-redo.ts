import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

export type UndoRedoActions = "undo" | "redo";

interface Config {
  action: UndoRedoActions;
  editor: Editor;
}

export function useUndoRedo({ action, editor }: Readonly<Config>) {
  const [canExecute, setCanExecute] = useState(false);

  useEffect(() => {
    const update = () => {
      if (action === "undo") {
        setCanExecute(editor.can().undo());
      } else {
        setCanExecute(editor.can().redo());
      }
    };

    editor.on("selectionUpdate", update);

    return () => {
      editor.off("update", update);
    };
  }, [editor, action]);

  const execute = () => {
    if (action === "undo") {
      editor.chain().undo().run();
    } else {
      editor.chain().redo().run();
    }
  };

  return { canExecute, execute };
}
