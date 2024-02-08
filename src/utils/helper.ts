import { HierarchyRole, UserRole } from "@/types/user";

// pause the thread for a given time
export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

// exclude some keys of an array of objects
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

// correctly type Object.keys
export const getKeysTypedObject = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;

/**
 * @param currentRole - the role of the user
 * @param minimumRole - the minimum role required to perform the action
 * @description less score has more rights
 * @description minimumRole default to "Admin" and currentRole default to GUEST
 */
export function isActionAuthorizedByRole(
  currentRole: UserRole | null = UserRole.GUEST,
  minimumRole: (typeof HierarchyRole)[keyof typeof HierarchyRole] = 0
) {
  return currentRole ? HierarchyRole[currentRole] <= minimumRole : false;
}
