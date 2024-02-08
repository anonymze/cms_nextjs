import { HierarchyRole, type UserRole } from "@/types/user";

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
 * @description less score has more rights and minimumRole default is "Admin" if nothing is provided
 */
export function isActionAuthorizedByRole(
  currentRole:  UserRole,
  minimumRole: typeof HierarchyRole[keyof typeof HierarchyRole] = 0
) {
  // authorized user need to be less or equal than minimum role
  return HierarchyRole[currentRole] <= minimumRole;
}
