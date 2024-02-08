"use client"

import { I18n } from "@/types/i18n";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "./local_storage";
import { LocalStorageKeys } from "@/types/local_storage";

export const setLocaleLangFromNavigator = () => {
  // if a language is already set, don't change it
  if (getLocalStorageItem(LocalStorageKeys.LANG) != null) return;

  setLocalStorageItem(
    LocalStorageKeys.LANG,
    window.navigator.language in I18n ? window.navigator.language : I18n.DEFAULT
  );
};

export const setLocaleLangFromUser = (lang: I18n) => {
  setLocalStorageItem(LocalStorageKeys.LANG, lang);
};
