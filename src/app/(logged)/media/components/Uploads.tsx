"use client";

import Image from "next/image";
import MediaOperation from "@/components/MediaOperation/MediaOperation";
import { SkeletonCard } from "@/components/ui/Skeleton/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { getUploadsQuery } from "@/api/queries/uploadQueries";
import { cn } from "@/utils/libs/shadcn";
import Content from "./Content";

const COUNT_CARD_SKELETONS = 6;

const Uploads: React.FC<{}> = ({}) => {
  const {
    data: uploads,
  } = useQuery({
    queryKey: ["uploads"],
    queryFn: getUploadsQuery,
  });

  return (    
    <section
      className={cn(
        "relative min-h-[50vh]",
        uploads && uploads.length > 0
          ? "flex flex-wrap gap-4 content-baseline"
          : "grid grid-cols-wrap-lg gap-x-5 gap-y-10",
      )}
    >
      {uploads && uploads.length > 0 ? (
        <>
          {/* if data we show the medias */}
          {uploads.map((upload) => (
            <MediaOperation removeFileFromApi={upload.uuid} key={upload.id}>
              <Image
                placeholder="blur"
                blurDataURL={"/placeholder-150x150.jpg"}
                width={150}
                height={150}
                priority
                key={upload.id}
                src={upload.filepath_public}
                alt=""
              />
            </MediaOperation>
          ))}
        </>
      ) : (
        <>
          {/* else we show the placeholders */}
          {[...Array(COUNT_CARD_SKELETONS)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </>
      )}
      <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col">
        {/* if data we hide the action button */}
        <Content hideActionButton={!uploads || !uploads.length ? false : true} />
      </div>
    </section>
  );
};

export default Uploads;