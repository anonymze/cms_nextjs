export enum LocalStorageKeys {
    LANG = 'locale-lang',
    THEME = 'theme',
}

export function getLocalStorageItem(key: LocalStorageKeys) {
  const val = localStorage.getItem(key);
  if (val == null) return null;
  return JSON.parse(val);
}

export function setLocalStorageItem(
  key: LocalStorageKeys,
  val: string | { [key: string]: string }
): void {
  localStorage.setItem(key, JSON.stringify(val));
}
