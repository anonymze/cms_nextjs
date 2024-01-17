import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { Button } from "../Button";

export interface TAction {
  label: string;
  action: (...args: any) => void;
  disabled?: (...args: any) => boolean;
}

export function TableActions({
  actions,
  entity,
}: {
  actions: TAction[];
  entity: { uuid: string; [key: string]: unknown };
}) {
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
            onClick={() => action.action(entity?.uuid || "")}
            disabled={!action.disabled ? false : !!action.disabled(entity)}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
