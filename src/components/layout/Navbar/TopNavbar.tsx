"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/Button";
import { useThemeStore } from "@/contexts/store_ui_context";
import { Switch } from "../../ui/Switch";

interface Props {}

const TopNavbar: React.FC<Props> = () => {
  const router = useRouter();
  const setTheme = useThemeStore((theme) => theme.setTheme);

  const changeTheme = (checked: boolean) => {
    if (checked) {
      setTheme("light");
      return;
    }

    setTheme("dark");
    return;
  };
  return (
    <nav className="flex justify-between items-center pb-8">
      <Button onClick={() => router.back()}>
        <ArrowLeft className="h-5 w-5 mr-1" /> Retour
      </Button>
      <Switch onCheckedChange={changeTheme} />
    </nav>
  );
};

export default TopNavbar;
