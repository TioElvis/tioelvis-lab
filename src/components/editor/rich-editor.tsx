"use client";
import { Toolbar } from "./toolbar";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";

interface Props {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

export function RichEditor(props: Readonly<Props>) {
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
          autolink: true,
          openOnClick: false,
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
          class: "rounded-lg max-w-full h-80 z-0 bg-input",
        },
      }),
      Placeholder.configure({
        placeholder: props.placeholder,
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    immediatelyRender: false,
    content: props.content,
    onUpdate: ({ editor }) => {
      props.setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        spellCheck: "true",
      },
    },
  });

  return (
    <section className="w-full h-full border rounded-md flex flex-col relative overflow-y-auto">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </section>
  );
}
