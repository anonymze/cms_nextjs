"use client";

import Image from "next/image";
import MediaOperation from "@/components/media-operation/MediaOperation";
import { SkeletonCard } from "@/components/ui/skeleton/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { getMediaQuery } from "@/api/queries/mediaQueries";
import { cn } from "@/utils/libs/tailwind/merge";
import Content from "./Content";

const COUNT_CARD_SKELETONS = 6;

const Media: React.FC = () => {
	const { data: media } = useQuery({
		queryKey: ["media"],
		queryFn: getMediaQuery,
	});

	return (
		<section
			className={cn(
				"relative min-h-[50vh]",
				media && media.length > 0
					? "flex flex-wrap gap-4 content-baseline"
					: "grid grid-cols-wrap-lg gap-x-5 gap-y-10",
			)}
		>
			{media && media.length > 0 ? (
				<>
					{/* if data we show the medias */}
					{media.map((media) => (
						<MediaOperation removeFileFromApi={media.uuid} key={media.uuid}>
							<Image
								placeholder="blur"
								blurDataURL={"/placeholder-150x150.jpg"}
								width={150}
								height={150}
								priority
								key={media.uuid}
								src={media.filepath_public}
								alt=""
							/>
						</MediaOperation>
					))}
				</>
			) : (
				<>
					{/* else we show the placeholders */}
					{[...Array(COUNT_CARD_SKELETONS)].map((nbr) => (
						<SkeletonCard key={nbr} />
					))}
				</>
			)}
			<div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col">
				{/* if data we hide the action button */}
				<Content hideActionButton={!media || !media.length ? false : true} />
			</div>
		</section>
	);
};

export default Media;
