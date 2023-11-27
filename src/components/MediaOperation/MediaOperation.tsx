"use client";

import { Trash2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUploadQuery } from "@/api/uploadQueries";
import type { Upload } from "@/types/upload";
import type { HTMLAttributes } from "react";
import "./MediaOperation.css";
import { useToast } from "@/hooks/use_toast";

interface Props extends HTMLAttributes<HTMLElement> {
  removeFileFromApi: Upload["uuid"] | false;
}

const MediaOperation: React.FC<Props> = ({ removeFileFromApi, children, ...props }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteUploadQuery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploads"] });
      toast({
        title: "Média supprimé",
        variant: "destructive",
        duration: 2500,
      });
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

export default MediaOperation;
