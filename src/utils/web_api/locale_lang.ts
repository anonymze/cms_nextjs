"use client";

import { I18n } from "@/types/i18n";
import { getLocalStorageItem, setLocalStorageItem } from "./local_storage";
import { LocalStorageKeys } from "@/types/local_storage";

/**
 * @description set the locale language from the navigator if it's not already set
 */
export const setLocaleLangFromNavigator = () => {
  // in prevention the function is called on the server
  if (typeof window === "undefined") return;

  if (getLocalStorageItem(LocalStorageKeys.LANG) != null) return;

  setLocalStorageItem(
    LocalStorageKeys.LANG,
    window.navigator.language in I18n ? window.navigator.language : I18n.DEFAULT
  );
};

/**
 * @description set the locale language from an action
 */
export const setLocaleLangFromUser = (lang: I18n) => {
  setLocalStorageItem(LocalStorageKeys.LANG, lang);
};
