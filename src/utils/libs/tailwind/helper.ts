import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @description merge tailwind classes with clsx, clsx is used to handle undefined, null, false, object classes, string classes...
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
