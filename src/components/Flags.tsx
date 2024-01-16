import type { I18n } from "@/types/i18n";
import Image from "next/image";

export default async function Flags({ flag }: { flag: I18n }) {
  const FlagSvg = await import(`@/assets/icons/flags/${flag}.svg`);
  return <Image src={FlagSvg} alt="Drapeau Anglais" width={20} height={20} />;
}
