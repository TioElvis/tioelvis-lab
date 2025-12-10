import { Editor } from "@tiptap/react";
import { MarkGroup } from "./tools/mark/mark-group";
import { DialogLink } from "./tools/link/dialog-link";
import { DialogImage } from "./tools/image/dialog-image";
import { UndoRedoButton } from "./tools/undo-redo/undo-redo-button";
import { CodeBlockButton } from "./tools/codeblock/code-block-button";
import { BlockquoteButton } from "./tools/blockquote/blockquote-button";
import { HeadingDropdownMenu } from "./tools/heading/heading-dropdown-menu";
import { ListingDropdownMenu } from "./tools/listing/listing-dropdown-menu";
import { HighlightDropdownMenu } from "./tools/highlight/highlight-dropdown-menu";

interface Props {
  editor: Editor | null;
}

export function Toolbar({ editor }: Readonly<Props>) {
  if (!editor) {
    return null;
  }

  return (
    <header className="w-full p-2 flex flex-wrap gap-2 sticky top-0 z-20 bg-background border-b">
      <UndoRedoButton action="undo" editor={editor} />
      <UndoRedoButton action="redo" editor={editor} />
      <HeadingDropdownMenu editor={editor} />
      <ListingDropdownMenu editor={editor} />
      <BlockquoteButton editor={editor} />
      <CodeBlockButton editor={editor} />
      <MarkGroup editor={editor} />
      <HighlightDropdownMenu editor={editor} />
      <DialogLink editor={editor} />
      <DialogImage editor={editor} />
    </header>
  );
}
