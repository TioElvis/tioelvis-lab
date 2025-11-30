import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

export type ListType = "bulletList" | "orderedList";

interface Config {
  editor: Editor;
}

export function useList({ editor }: Readonly<Config>) {
  const [list, setList] = useState<ListType | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const update = () => {
      if (editor.isActive("bulletList")) {
        setList("bulletList");
      } else if (editor.isActive("orderedList")) {
        setList("orderedList");
      } else {
        setList(undefined);
      }

      setIsDisabled(
        editor.isActive("blockquote") || editor.isActive("codeBlock")
      );
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

  const execute = (type: ListType) => {
    if (isDisabled) return;

    if (list === type) {
      editor.chain().focus().liftListItem("listItem").run();
    } else {
      if (type === "bulletList") {
        editor.chain().focus().toggleBulletList().run();
      } else if (type === "orderedList") {
        editor.chain().focus().toggleOrderedList().run();
      }
    }
  };

  return { list, isDisabled, execute };
}
