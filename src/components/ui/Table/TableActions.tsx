import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { CheckIcon, MoreHorizontal } from "lucide-react";
import React from "react";
import { Button } from "../Button";

interface SubMenuActions extends Omit<TAction, "subMenu" | "showMarkerOnDisabled"> {}

export interface TAction {
  label: string;
  action?: (...args: any) => void;
  disabled?: (...args: any) => boolean;
  showMarkerOnDisabled?: boolean;
  subMenu?: {
    items: SubMenuActions[];
  };
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
        {actions.map((action) => (
          <React.Fragment key={action.label}>
            {!action.subMenu ? (
              <DropdownMenuItem
                // you return the entity in action function, and do whatever you want with it in the parent
                onClick={() => action.action?.(entity)}
                // your disabled function should return a boolean
                disabled={!action.disabled ? false : !!action.disabled(entity)}
              >
                {action.label} {!action.disabled ? null : !!action.disabled(entity) && action.showMarkerOnDisabled ? <CheckIcon className="w-4 h-4" /> : null}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {action.label}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  {action.subMenu.items.map((subAction) => (
                    <DropdownMenuSubContent key={subAction.label}>
                      <DropdownMenuItem
                        // you return the entity in action function, and do whatever you want with it in the parent
                        onClick={() => subAction.action?.(entity?.uuid || "")}
                        // your function disabled should return a boolean
                        disabled={
                          !subAction.disabled
                            ? false
                            : !!subAction.disabled(entity)
                        }
                      >
                        {subAction.label} {!action.disabled ? null : !!action.disabled(entity) && action.showMarkerOnDisabled ? <CheckIcon className="w-4 h-4" /> : null}
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  ))}
                </DropdownMenuPortal>
              </DropdownMenuSub>
            )}
          </React.Fragment>
        ))}
        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
