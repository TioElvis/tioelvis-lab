"use client";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { FormatState, useFormatBar } from "./use-format-bar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Props {
  editor: Editor;
}

export function FormatBar({ editor }: Readonly<Props>) {
  const { toggleFormat, getActiveFormats } = useFormatBar({ editor });

  const formats = [
    {
      value: "bold" as keyof FormatState,
      Icon: BoldIcon,
      label: "Bold",
    },
    {
      value: "italic" as keyof FormatState,
      Icon: ItalicIcon,
      label: "Italic",
    },
    {
      value: "strike" as keyof FormatState,
      Icon: StrikethroughIcon,
      label: "Strikethrough",
    },
    {
      value: "underline" as keyof FormatState,
      Icon: UnderlineIcon,
      label: "Underline",
    },
  ];

  return (
    <ToggleGroup type="multiple" value={getActiveFormats()}>
      {formats.map(({ value, Icon, label }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={label}
          className="cursor-pointer"
          onClick={() => toggleFormat(value)}>
          <Icon className="h-4 w-4" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
