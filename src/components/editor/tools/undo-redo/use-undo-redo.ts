import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

export type UndoRedoActions = "undo" | "redo";

interface Config {
  editor: Editor;
  action: UndoRedoActions;
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

    editor.on("update", update);
    editor.on("transaction", update);
    editor.on("selectionUpdate", update);

    return () => {
      editor.off("update", update);
      editor.off("transaction", update);
      editor.off("selectionUpdate", update);
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
