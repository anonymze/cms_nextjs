"use client";

import { Trash2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { deleteUploadQuery } from "@/api/queries/uploadQueries";
import { toast } from "sonner";
import type { Upload } from "@/types/upload";
import type { HTMLAttributes } from "react";
import "./MediaOperation.css";

interface Props extends HTMLAttributes<HTMLElement> {
  removeFileFromApi: Upload["uuid"] | false;
}

const MediaOperation: React.FC<Props> = ({ removeFileFromApi, children, ...props }) => {
  const deleteMutation = useMutation({
    mutationFn: deleteUploadQuery,
    mutationKey: ["uploads"],
    meta: { test: "oui" },
  });

  return (
    <figure
      onClick={async () => {
        if (!removeFileFromApi) return;
        deleteMutation.mutate(removeFileFromApi);
        toast.error(
          "Event has been created",
          // , {
          //   description: "Sunday, December 03, 2023 at 9:00 AM",
          //   action: {
          //     label: "Undo",
          //     onClick: () => console.log("Undo"),
          //   },
          // }
        );
      }}
      className="media-operation"
      {...props}
    >
      {children}
      <figcaption>
        <Trash2Icon className="w-8 h-8" />
      </figcaption>
    </figure>
  );
};

export default MediaOperation;
