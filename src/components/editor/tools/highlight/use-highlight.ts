import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface Config {
  editor: Editor;
}

export function useHighlight({ editor }: Readonly<Config>) {
  const [isActive, setIsActive] = useState(false);
  const [activeColor, setActiveColor] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const active = editor.isActive("highlight");
      setIsActive(active);

      if (active) {
        const { color } = editor.getAttributes("highlight");
        setActiveColor(color || null);
      } else {
        setActiveColor(null);
      }
    };

    update();
    editor.on("update", update);
    editor.on("transaction", update);
    editor.on("selectionUpdate", update);

    return () => {
      editor.off("update", update);
      editor.off("transaction", update);
      editor.off("selectionUpdate", update);
    };
  }, [editor]);

  const setHighlight = (color: string) => {
    editor.chain().focus().setHighlight({ color }).run();
  };

  const removeHighlight = () => {
    editor.chain().focus().unsetHighlight().run();
  };

  return { isActive, activeColor, setHighlight, removeHighlight };
}
