
"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from 'next/navigation'
import { Button } from "../../ui/Button";
import { useThemeStore } from "@/contexts/StoreUIContext";
import { Switch } from "../../ui/Switch";

interface Props {}

const TopNavbar: React.FC<Props> = () => {
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
    <nav className="flex justify-between items-center pb-8">
        <Button actionClick={goBack}><ArrowLeft className="h-5 w-5 mr-1" /> Retour</Button>
        <Switch onCheckedChange={changeTheme} />
    </nav>
  )
}

export default TopNavbar