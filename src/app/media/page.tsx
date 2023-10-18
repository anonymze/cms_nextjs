import { SkeletonCard } from "@/components/ui/Skeleton/Skeleton";
import ContentMedia from "./ContentMedia";

const COUNT_CARD_SKELETONS = 6;

export default async function page() {
  return (
    <section className="relative grid grid-cols-wrap-lg gap-x-5 gap-y-10">
        {[...Array(COUNT_CARD_SKELETONS)].map((_, i) =>
          <SkeletonCard key={i} />
        )}
        <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col">
          <ContentMedia />
        </div>
    </section>
  )
}