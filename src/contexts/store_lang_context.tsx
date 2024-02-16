import { I18n } from "@/types/i18n";
import { create } from "zustand";

type StateLang = {
  lang: I18n;
};

type ActionLang = {
  setLang: (lang: StateLang["lang"]) => void;
};

export const useLangStore = create<StateLang & ActionLang>()((set) => ({
  lang: I18n.DEFAULT,
  setLang: (lang) => set(() => ({ lang })),
}));