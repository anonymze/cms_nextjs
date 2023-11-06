"use client";

import Image from "next/image";
import MediaOperation from "@/components/MediaOperation/MediaOperation";
import DialogMedia from "./DialogMedia";
import { SkeletonCard } from "@/components/ui/Skeleton/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { getUploadsQuery } from "@/api/uploadQueries";
import type { Upload } from "@/types/upload";

const COUNT_CARD_SKELETONS = 6;

const Uploads: React.FC<{ initialData: Upload[] }> = ({ initialData }) => {
  const { data: uploads } = useQuery({
    queryKey: ["uploads"],
    queryFn: getUploadsQuery,
    initialData,
  });

  if (uploads && uploads.length > 0) {
    return (
      <section className="relative flex flex-wrap gap-4 min-h-[50vh]">
        {uploads.map((upload) => (
          <MediaOperation removeFileFromApi={upload.uuid} key={upload.id}>
            <Image
              width={150}
              height={150}
              priority
              key={upload.id}
              src={upload.filepath_public}
              alt=""
            />
          </MediaOperation>
        ))}
        <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col">
          <DialogMedia showActionButton={false} />
        </div>
      </section>
    );
  }

  return (
    <section className="relative grid grid-cols-wrap-lg gap-x-5 gap-y-10">
      {[...Array(COUNT_CARD_SKELETONS)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
      <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col">
        <DialogMedia showActionButton />
      </div>
    </section>
  );
};

export default Uploads;
