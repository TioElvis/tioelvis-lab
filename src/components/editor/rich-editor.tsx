"use client";
import { Toolbar } from "./toolbar";
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
    <section className="border rounded-md">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </section>
  );
}
