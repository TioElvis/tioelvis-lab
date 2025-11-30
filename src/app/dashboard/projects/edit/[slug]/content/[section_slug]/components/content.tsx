"use client";
import { useState } from "react";
import { RichEditor } from "@/components/editor/rich-editor";

export function Content() {
  const [content, setContent] = useState("");

  return (
    <RichEditor
      content={content}
      setContent={setContent}
      placeholder="Start writing..."
    />
  );
}
