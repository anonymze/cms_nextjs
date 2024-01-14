import { I18n } from "@/types/i18n";
import IconFlagFr from "@/assets/icons/flags/fr.svg";
import IconFlagEn from "@/assets/icons/flags/en.svg";
import Image from "next/image";

export default function Flags({ flag }: { flag: string }) {
  if (flag === I18n.FR) return <Image src={IconFlagFr} alt="Drapeau Français" width={20} height={20} />;

  // default en
  return <Image src={IconFlagEn} alt="Drapeau Anglais" width={20} height={20} />;
}
