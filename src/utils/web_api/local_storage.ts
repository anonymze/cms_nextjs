import type { LocalStorageKeys } from "@/types/local_storage";

/**
 * @description get a local storage item correctly transformed in JSON
 */
export function getLocalStorageItem(key: LocalStorageKeys) {
  const val = window.localStorage.getItem(key);
  if (val == null) return null;

  return JSON.parse(val);
}

/**
 * @description set a local storage item correctly transformed in JSON
 */
export function setLocalStorageItem(
  key: LocalStorageKeys,
  val: string | { [key: string]: string }
) {
  window.localStorage.setItem(key, JSON.stringify(val));
}
