import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface Config {
  editor: Editor;
}

interface ImageAttributes {
  src: string | null;
  alt: string | null;
}

export function useImage({ editor }: Readonly<Config>) {
  const [isActive, setIsActive] = useState(false);
  const [currentImage, setCurrentImage] = useState<ImageAttributes>({
    src: null,
    alt: null,
  });

  useEffect(() => {
    const update = () => {
      const active = editor.isActive("image");
      setIsActive(active);

      if (active) {
        const attrs = editor.getAttributes("image");
        setCurrentImage({
          src: attrs.src || null,
          alt: attrs.alt || null,
        });
      } else {
        setCurrentImage({ src: null, alt: null });
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

    // If there is an active image, update it
    if (isActive) {
      editor
        .chain()
        .focus()
        .updateAttributes("image", { src, alt: alt || "" })
        .run();
    } else {
      // If there is no active image, insert a new one
      editor
        .chain()
        .focus()
        .setImage({ src, alt: alt || "" })
        .run();
    }

    // Force update of the state after modification
    setTimeout(() => {
      const attrs = editor.getAttributes("image");
      setCurrentImage({
        src: attrs.src || null,
        alt: attrs.alt || null,
      });
    }, 0);
  };

  const removeImage = () => {
    editor.chain().focus().deleteSelection().run();

    // Clear state after removal
    setIsActive(false);
    setCurrentImage({ src: null, alt: null });
  };

  return { isActive, currentImage, setImage, removeImage };
}
