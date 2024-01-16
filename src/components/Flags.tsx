import Image from "next/image";
import type { I18n } from "@/types/i18n";

export default async function Flags({ flag }: { flag: I18n }) {
  const FlagSvg = await import(`@/assets/icons/flags/${flag}.svg`);
  return <Image src={FlagSvg} alt={`Drapeau ${flag}`} width={20} height={20} />;
}
