"use client";
import Image from "@tiptap/extension-image";
import { Toolbar } from "./toolbar/toolbar";
import StarterKit from "@tiptap/starter-kit";
import { Dispatch, SetStateAction } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";

interface Props {
  content: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder,
}: Readonly<Props>) {
  const isMobile = useIsMobile();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-6",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-6",
          },
        },
        link: {
          openOnClick: false,
          autolink: true,
          linkOnPaste: true,
          HTMLAttributes: {
            class:
              "text-primary underline cursor-pointer hover:text-primary/80",
          },
        },
      }).extend({
        addKeyboardShortcuts() {
          return {
            Space: ({ editor }) => {
              const { state } = editor;
              if (editor.isActive("link")) {
                const { tr } = state;
                tr.insertText(" ");
                tr.removeStoredMark(state.schema.marks.link);
                editor.view.dispatch(tr);
                return true;
              }
              return false;
            },
          };
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-96 z-0 bg-input",
        },
      }),
      Placeholder.configure({ placeholder }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <section className="relative rounded-md border border-input">
      {/* For now the toolbar is hidden on mobile */}
      {isMobile ? null : <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </section>
  );
}
