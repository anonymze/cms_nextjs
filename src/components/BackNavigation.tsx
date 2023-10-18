
"use client"
import { ArrowLeft } from "lucide-react"
import { useRouter } from 'next/navigation'
import Button from "./ui/Button";

interface Props {}

const BackNavigation: React.FC<Props> = () => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    }
  return (
    <nav>
        <Button actionClick={goBack}><ArrowLeft className="inline-block h-5 w-5 mr-2 align-bottom" /> Retour</Button>
    </nav>
  )
}

export default BackNavigation