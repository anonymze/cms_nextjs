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
import React, { useContext } from "react";
import { Button } from "../Button";
import { LangContext } from "@/utils/providers";
import { i18n } from "@/i18n/translations";

interface SubMenuActions
  extends Omit<TAction, "subMenu" | "showMarkerOnDisabled"> {}

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
  const lang = useContext(LangContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0">
          <span className="sr-only">{i18n[lang]("OPEN_MENU_ACTIONS")}</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{i18n[lang]("ACTIONS")}</DropdownMenuLabel>
        {actions.map((action) => (
          <React.Fragment key={action.label}>
            {!action.subMenu ? (
              <DropdownMenuItem
                // you return the entity in action function, and do whatever you want with it in the parent
                onClick={() => action.action?.(entity)}
                // your disabled function should return a boolean
                disabled={!action.disabled ? false : !!action.disabled(entity)}
              >
                {action.label}{" "}
                {!action.disabled ? null : !!action.disabled(entity) &&
                  action.showMarkerOnDisabled ? (
                  <CheckIcon className="w-4 h-4 ml-2" />
                ) : null}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>{action.label}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {action.subMenu.items.map((subAction) => (
                      <DropdownMenuItem
                        key={subAction.label}
                        // you return the entity in action function, and do whatever you want with it in the parent
                        onClick={() => subAction.action?.(entity)}
                        // your function disabled should return a boolean
                        disabled={
                          !subAction.disabled
                            ? false
                            : !!subAction.disabled(entity)
                        }
                      >
                        {subAction.label}{" "}
                        {!subAction.disabled ? null : !!subAction.disabled(entity) &&
                          action.showMarkerOnDisabled ? (
                          <CheckIcon className="w-4 h-4 ml-2" />
                        ) : null}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
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
