"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/Button";

interface Props {
  actionPopup?: {
    label: string;
  };
}

const ActionsButtons: React.FC<Props> = ({ actionPopup }) => {
  const openDialog = () => {
    document.querySelector("dialog")?.show();
  };

  return (
    <div className="flex items-center gap-3">
      {actionPopup && (
        <Button onClick={openDialog}>
          <PlusCircleIcon className="h-5 w-5 mr-1" /> {actionPopup.label}
        </Button>
      )}
    </div>
  );
};

export default ActionsButtons;
