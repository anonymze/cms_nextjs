"use client";

import Image from "next/image";
import MediaOperation from "@/components/media-operation/MediaOperation";
import Content from "./Content";
import { useQuery } from "@tanstack/react-query";
import { getMediaQuery } from "@/api/queries/mediaQueries";
import { cn } from "@/utils/libs/tailwind/helper";

const Media: React.FC = () => {
  const {
    data: media,
    isLoading,
  } = useQuery({
    queryKey: ["media"],
    queryFn: getMediaQuery,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <section
      className={cn(
        "relative min-h-[50vh]",
        media?.length
          ? "flex flex-wrap gap-4 content-baseline"
          : "grid grid-cols-wrap-lg gap-x-5 gap-y-10"
      )}
    >
      {media?.length ? (
        <>
          {/* if data we show the medias */}
          {media.map((media) => (
            <MediaOperation mediaUuid={media.uuid} removeMediaFromApi={true} key={media.uuid}>
              <Image
                placeholder="blur"
                blurDataURL={"/placeholder-150x150.jpg"}
                width={150}
                height={150}
                priority={true}
                src={media.filepath_public}
                alt=""
              />
            </MediaOperation>
          ))}
        </>
      ) : null}
      <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col">
        {/* if data we hide the action button, we have to do that because inside there is the dialog component used with other buttons */}
        <Content hideActionButton={!media || !media.length ? false : true} />
      </div>
    </section>
  );
};

export default Media;
