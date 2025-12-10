import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface Config {
  editor: Editor;
}

export function useLink({ editor }: Readonly<Config>) {
  const [isActive, setIsActive] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const { state } = editor;
      const { from, to } = state.selection;

      let hasLink = false;
      let linkHref = null;

      state.doc.nodesBetween(from, to, (node) => {
        if (node.marks) {
          const linkMark = node.marks.find((mark) => mark.type.name === "link");
          if (linkMark) {
            hasLink = true;
            linkHref = linkMark.attrs.href;
          }
        }
      });

      if (!hasLink) {
        hasLink = editor.isActive("link");

        if (hasLink) {
          const { href } = editor.getAttributes("link");
          linkHref = href;
        }
      }

      setIsActive(hasLink);
      setCurrentUrl(linkHref || null);
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

  const setLink = (url: string) => {
    if (!url) return;

    const formattedUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: formattedUrl })
      .run();
  };

  const updateLink = (url: string, newText?: string) => {
    if (!url) return;

    const formattedUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;

    if (newText && newText.trim()) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .deleteSelection()
        .insertContent(`<a href="${formattedUrl}">${newText}</a> `)
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: formattedUrl })
        .run();
    }
  };

  const removeLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  };

  return { isActive, currentUrl, setLink, updateLink, removeLink };
}
