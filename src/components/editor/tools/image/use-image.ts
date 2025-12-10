import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface Config {
  editor: Editor;
}

interface Attributes {
  src: string | null;
  alt: string | null;
}

export function useImage({ editor }: Readonly<Config>) {
  const [isActive, setIsActive] = useState(false);
  const [current, setCurrent] = useState<Attributes>({
    src: null,
    alt: null,
  });

  useEffect(() => {
    const update = () => {
      const active = editor.isActive("image");
      setIsActive(active);

      if (active) {
        const attrs = editor.getAttributes("image");
        setCurrent({
          src: attrs.src || null,
          alt: attrs.alt || null,
        });
      } else {
        setCurrent({ src: null, alt: null });
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

  const setImage = (src: string, alt?: string) => {
    if (!src) return;

    if (isActive) {
      editor.chain().focus().updateAttributes("image", { src, alt }).run();
    } else {
      editor.chain().focus().setImage({ src, alt }).run();
    }

    setTimeout(() => {
      const attrs = editor.getAttributes("image");

      setCurrent({
        src: attrs.src,
        alt: attrs.alt,
      });
    }, 0);
  };

  const removeImage = () => {
    editor.chain().focus().deleteSelection().run();

    setIsActive(false);
    setCurrent({ src: null, alt: null });
  };

  return { isActive, current, setImage, removeImage };
}
