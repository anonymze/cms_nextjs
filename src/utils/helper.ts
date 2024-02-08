import { HierarchyRole, UserRole } from "@/types/user";
import type { User } from "@prisma/client";

/**
 * @description pause the thread for a given time
 */
export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

/**
 * @description exclude keys of an array of objects
 */
export const excludeEntryFromArrayOfObjects = (
  arrayOfObjects: any[],
  keys: string[]
) => {
  return arrayOfObjects.map((object) => {
    for (const key of keys) {
      delete object[key];
    }

    return object;
  });
};

/**
 * @description correctly type Object.keys
 */
export const getKeysTypedObject = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;

/**
 * @param currentRole - the role of the user
 * @param minimumRole - the minimum role required to perform the action
 * @description less score has more rights
 * @description minimumRole default to "Admin"
 */
export function isActionAuthorized(
  user: User | null,
  minimumRole: (typeof HierarchyRole)[keyof typeof HierarchyRole] = 0
) {
  if (!user || !user.isActive) return false;
  return user.role ? HierarchyRole[user.role] <= minimumRole : false;
}
