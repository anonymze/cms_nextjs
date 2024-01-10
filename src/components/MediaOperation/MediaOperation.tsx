"use client";

import { Trash2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { deleteUploadQuery } from "@/api/queries/uploadQueries";
import type { HTMLAttributes } from "react";
import type { Upload } from "@prisma/client";
import "./MediaOperation.css";

interface Props extends HTMLAttributes<HTMLElement> {
  removeFileFromApi: Upload["uuid"] | false;
}

export default function MediaOperation({ removeFileFromApi, children, ...props }: Props) {
  const deleteMutation = useMutation({
    mutationFn: deleteUploadQuery,
    mutationKey: ["uploads"],
    meta: {
      message: "Le média a été supprimé",
    },
  });

  return (
    <figure
      onClick={async () => {
        if (!removeFileFromApi) return;
        deleteMutation.mutate(removeFileFromApi);
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