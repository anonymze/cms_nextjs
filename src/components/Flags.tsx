import Image from "next/image";
import type { I18n } from "@/types/i18n";

export default function Flags({ flag }: { flag: I18n }) {
  return (
    <Image
      // we import dynamicly with "require()" (resolved at runtime instead of "import()" which is static and resolved at build time)
      src={require(`@/assets/icons/flags/${flag}.svg`)}
      alt={`Drapeau ${flag}`}
      width={20}
      height={20}
      layout="fixed"
    />
  );
}
