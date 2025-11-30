import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface Config {
  editor: Editor;
}

export function useCodeBlock({ editor }: Readonly<Config>) {
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsActive(editor.isActive("codeBlock"));

      setIsDisabled(
        editor.isActive("bulletList") ||
          editor.isActive("orderedList") ||
          editor.isActive("blockquote")
      );
    };

    editor.on("update", update);
    editor.on("transaction", update);
    editor.on("selectionUpdate", update);

    return () => {
      editor.off("update", update);
      editor.off("transaction", update);
      editor.off("selectionUpdate", update);
    };
  }, [editor]);

  const execute = () => {
    if (!isDisabled) {
      editor.chain().focus().toggleCodeBlock().run();
    }
  };

  return { isActive, isDisabled, execute };
}
