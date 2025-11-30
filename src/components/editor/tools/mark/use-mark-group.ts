import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

export type FormatState = {
  bold: boolean;
  italic: boolean;
  strike: boolean;
  underline: boolean;
};

interface Config {
  editor: Editor;
}

export function useMarkGroup({ editor }: Readonly<Config>) {
  const [formats, setFormats] = useState<FormatState>({
    bold: false,
    italic: false,
    strike: false,
    underline: false,
  });

  useEffect(() => {
    const update = () => {
      setFormats({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        strike: editor.isActive("strike"),
        underline: editor.isActive("underline"),
      });
    };

    update();

    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  const toggleFormat = (format: keyof FormatState) => {
    switch (format) {
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "strike":
        editor.chain().focus().toggleStrike().run();
        break;
      case "underline":
        editor.chain().focus().toggleUnderline().run();
        break;
    }
  };

  const getActiveFormats = (): string[] => {
    return (
      Object.entries(formats)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, isActive]) => isActive)
        .map(([format]) => format)
    );
  };

  return { formats, toggleFormat, getActiveFormats };
}
