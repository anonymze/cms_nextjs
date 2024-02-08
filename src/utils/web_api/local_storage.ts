"use client"

import type { LocalStorageKeys } from "@/types/local_storage";

export function getLocalStorageItem(key: LocalStorageKeys) {
  if (typeof window === "undefined") return;

  const val = window.localStorage.getItem(key);  
  if (val == null) return null;

  return JSON.parse(val);
}

export function setLocalStorageItem(
  key: LocalStorageKeys,
  val: string | { [key: string]: string }
) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(val));
}
