import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";

/**
 * @description merge tailwind classes with clsx, clsx is used to handle undefined, null, false, object classes, string classes...
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
