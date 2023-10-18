
"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from 'next/navigation'
import Button from "./ui/Button";
import { Switch } from "./ui/switch";
import { useThemeStore } from "@/contexts/StoreUIContext";

interface Props {}

const BackNavigation: React.FC<Props> = () => {
  const setTheme = useThemeStore((theme) => theme.setTheme)
    const router = useRouter();

    const goBack = () => {
        router.back();
    }

    const changeTheme = (checked: boolean) => {
        if (checked) {
          setTheme('light');
          return;
        }

        setTheme('dark');
        return;
    }
  return (
    <nav className="flex justify-between items-center mb-6">
        <Button actionClick={goBack}><ArrowLeft className="h-5 w-5 mr-2" /> Retour</Button>
        <Switch onCheckedChange={changeTheme} />
    </nav>
  )
}

export default BackNavigation