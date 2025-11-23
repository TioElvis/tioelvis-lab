import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

export type HeadingLevel = 1 | 2 | 3;

interface Config {
  editor: Editor;
}

export function useHeading({ editor }: Readonly<Config>) {
  const [heading, setHeading] = useState<HeadingLevel | 0>(0);

  useEffect(() => {
    const update = () => {
      if (editor.isActive("heading", { level: 1 })) {
        setHeading(1);
      } else if (editor.isActive("heading", { level: 2 })) {
        setHeading(2);
      } else if (editor.isActive("heading", { level: 3 })) {
        setHeading(3);
      } else {
        setHeading(0);
      }
    };

    update();

    editor.on("transaction", update);
    editor.on("selectionUpdate", update);

    return () => {
      editor.off("transaction", update);
      editor.off("selectionUpdate", update);
    };
  }, [editor]);

  const execute = (level: HeadingLevel) => {
    if (heading === level) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().setHeading({ level }).run();
    }
  };

  return { heading, execute };
}
