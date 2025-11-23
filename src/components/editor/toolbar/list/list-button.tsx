"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Editor } from "@tiptap/react";
import { ListType, useList } from "./use-list";
import { Button } from "@/components/ui/button";
import { ListIcon, ListOrderedIcon } from "lucide-react";

interface Props {
  editor: Editor;
}

export function ListButton({ editor }: Readonly<Props>) {
  const { list, isDisabled, execute } = useList({ editor });

  const LISTS = [
    {
      type: "bulletList" as ListType,
      Icon: ListIcon,
      label: "Bullet List",
    },
    {
      type: "orderedList" as ListType,
      Icon: ListOrderedIcon,
      label: "Ordered List",
    },
  ];

  const getCurrentIcon = () => {
    const current = LISTS.find(({ type }) => type === list);

    if (current) {
      const Icon = current.Icon;
      return <Icon className="text-primary" />;
    }

    return <ListIcon />;
  };

  return (
    <DropdownMenu modal={false}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild disabled={isDisabled}>
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon-sm"
              disabled={isDisabled}>
              {getCurrentIcon()}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>List</TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        {LISTS.map(({ type, Icon, label }) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => execute(type)}
            key={type}
            disabled={isDisabled}>
            <Icon className={cn(list === type && "text-primary")} />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
