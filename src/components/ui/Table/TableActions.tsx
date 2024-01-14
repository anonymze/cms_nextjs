import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { Button } from "../Button";

interface Props {
  actions: Array<{
    label: string;
    action: (...args: any) => void;
    disabled?: boolean;
  }>;
}

export function TableActions({ actions }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir menu actions</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {actions.map((action, idx) => (
          <DropdownMenuItem
            key={idx}
            onClick={action.action}
            disabled={action.disabled}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
