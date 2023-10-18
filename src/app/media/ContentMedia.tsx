"use client"

import { Button } from "@/components/ui/Button"
import { PlusCircleIcon } from "lucide-react"
import type { PropsWithChildren } from "react"

const ContentMedia: React.FC<PropsWithChildren> = () => {
  return (
    <Button className="py-8 px-6" onClick={() => {}}><PlusCircleIcon className="h-6 w-6 mr-2"/> Ajouter votre premier média</Button>
  )
}

export default ContentMedia