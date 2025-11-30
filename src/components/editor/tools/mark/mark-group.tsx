"use client";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { useMarkGroup } from "./use-mark-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Props {
  editor: Editor;
}

const formats = [
  {
    value: "bold",
    Icon: BoldIcon,
    label: "Bold",
  },
  {
    value: "italic",
    Icon: ItalicIcon,
    label: "Italic",
  },
  {
    value: "strike",
    Icon: StrikethroughIcon,
    label: "Strikethrough",
  },
  {
    value: "underline",
    Icon: UnderlineIcon,
    label: "Underline",
  },
] as const;

export function MarkGroup({ editor }: Readonly<Props>) {
  const { toggleFormat, getActiveFormats } = useMarkGroup({ editor });

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
