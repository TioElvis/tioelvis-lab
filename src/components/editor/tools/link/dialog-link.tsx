"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLink } from "./use-link";
import { Editor } from "@tiptap/react";
import { Fragment, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, LinkIcon, Trash2Icon } from "lucide-react";

interface Props {
  editor: Editor;
}

export function DialogLink({ editor }: Readonly<Props>) {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { isActive, currentUrl, setLink, removeLink, updateLink } = useLink({
    editor,
  });

  const handleOpenDialog = () => {
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to);

    if (isActive && currentUrl) {
      setUrl(currentUrl);
      setText(selectedText || "");
    } else {
      setUrl("");
      setText(selectedText || "");
    }

    setIsOpen(true);
  };

  const handleSetLink = () => {
    if (!url) return;

    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to);

    if (isActive) {
      updateLink(url, text);
    } else if (!selectedText && text) {
      editor
        .chain()
        .focus()
        .insertContent(
          `<a href="${
            url.match(/^https?:\/\//) ? url : `https://${url}`
          }">${text}</a> `
        )
        .run();
    } else if (selectedText) {
      setLink(url);
    }

    setIsOpen(false);
    setUrl("");
    setText("");
  };

  const handleRemoveLink = () => {
    removeLink();
    setIsOpen(false);
    setUrl("");
    setText("");
  };

  return (
    <Fragment>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            className="cursor-pointer"
            size="icon-sm"
            variant={isActive ? "default" : "ghost"}
            onClick={handleOpenDialog}>
            <LinkIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Link</TooltipContent>
      </Tooltip>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isActive ? "Edit Link" : "Insert Link"}</DialogTitle>
            <DialogDescription>
              {isActive
                ? "Update the URL or link text"
                : "Add a URL and optional text for the link"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <div className="flex gap-2">
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSetLink();
                    }
                  }}
                />
                {url && (
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => window.open(url, "_blank")}
                    title="Open link">
                    <ExternalLinkIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="text">Text {isActive ? "" : "(optional)"}</Label>
              <Input
                id="text"
                placeholder="Link text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSetLink();
                  }
                }}
              />
              {!isActive && (
                <p className="text-xs text-muted-foreground">
                  Leave empty to use selected text
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            {isActive && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleRemoveLink}
                className="sm:mr-auto cursor-pointer">
                <Trash2Icon className="h-4 w-4 mr-2" />
                Remove Link
              </Button>
            )}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                className="cursor-pointer"
                onClick={handleSetLink}
                disabled={!url}>
                {isActive ? "Update" : "Insert"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
