"use client"

import { Button } from "@/components/ui/Button";
import { SkeletonCard } from "@/components/ui/Skeleton/Skeleton";
import { PlusCircleIcon } from "lucide-react";

const COUNT_CARD_SKELETONS = 6;

export default async function page() {
  return (
    <section className="relative grid grid-cols-wrap-lg gap-x-5 gap-y-10">
        {[...Array(COUNT_CARD_SKELETONS)].map((_, i) =>
          <SkeletonCard key={i} />
        )}
        <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col">
          <Button className="py-8 px-6" onClick={() => {}}><PlusCircleIcon className="h-6 w-6 mr-2"/> Ajouter votre premier média</Button>
        </div>
    </section>
  )
}