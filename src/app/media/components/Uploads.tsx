"use client";

import Image from "next/image";
import MediaOperation from "@/components/MediaOperation/MediaOperation";
import { SkeletonCard } from "@/components/ui/Skeleton/Skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUploadsQuery } from "@/api/queries/uploadQueries";
import { cn } from "@/utils/libs/shadcn";
import Content from "./Content";
import type { Upload } from "@/types/upload";

const COUNT_CARD_SKELETONS = 6;

const Uploads: React.FC<{}> = ({}) => {
  // TODO fix bug here on build
  // const {
  //   data: uploads,
  // } = useSuspenseQuery({
  //   queryKey: ["uploads"],
  //   queryFn: getUploadsQuery,
  // });
  const uploads: Upload[] = [];

  // TODO IF IS FETCHING WE SHOW AN INDICATOR (loader ?)

  return (    
    <section
      className={cn(
        "relative min-h-[50vh]",
        uploads.length > 0
          ? "flex flex-wrap gap-4 content-baseline"
          : "grid grid-cols-wrap-lg gap-x-5 gap-y-10",
      )}
    >
      {uploads.length > 0 ? (
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
            <SkeletonCard height={"9px"} key={i} />
          ))}
        </>
      )}
      <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col">
        {/* if data we hide the action button */}
        <Content hideActionButton={uploads.length > 0} />
      </div>
    </section>
  );
};

export default Uploads;
