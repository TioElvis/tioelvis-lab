import type { Editor } from "@tiptap/react";
import { Fragment } from "react/jsx-runtime";
import { ListButton } from "./list/list-button";
import { FormatBar } from "./format/format-bar";
import { LinkButton } from "./link/link-button";
import { ImageButton } from "./image/image-button";
import { HeadingButton } from "./heading/heading-button";
import { UndoRedoButton } from "./undo-redo/undo-redo-button";
import { HighlightButton } from "./highlight/highlight-button";
import { CodeBlockButton } from "./codeblock/code-block-button";
import { BlockquoteButton } from "./blockquote/blockquote-button";

interface Props {
  editor: Editor | null;
}

export function Toolbar({ editor }: Readonly<Props>) {
  if (!editor) {
    return null;
  }

  return (
    <header className="flex sticky top-0 z-50 bg-background items-center px-4 py-2 border-b rounded-t-md">
      <Fragment>
        <UndoRedoButton action="undo" editor={editor} />
        <UndoRedoButton action="redo" editor={editor} />
      </Fragment>
      <span className="w-px mx-2 h-5 bg-border" />
      <HeadingButton editor={editor} />
      <ListButton editor={editor} />
      <BlockquoteButton editor={editor} />
      <CodeBlockButton editor={editor} />
      <span className="w-px mx-2 h-5 bg-border" />
      <FormatBar editor={editor} />
      <span className="w-px mx-2 h-5 bg-border" />
      <HighlightButton editor={editor} />
      <LinkButton editor={editor} />
      <ImageButton editor={editor} />
    </header>
  );
}
