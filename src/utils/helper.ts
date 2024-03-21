import { HierarchyRole } from "@/types/user";
import type { User } from "@prisma/client";

/**
 * @description pause the thread for a given time
 */
export const sleep = (time: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
};

/**
 * @description exclude keys of an array of objects
 */
export const excludeEntryFromArrayOfObjects = (arrayOfObjects: any[], keys: string[]) => {
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
export const getKeysTypedObject = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

/**
 * @param currentRole - the role of the user
 * @param minimumRole - the minimum role required to perform the action
 * @description less score has more rights
 * @description minimumRole default to "Admin"
 */
export const isActionAuthorized = (
	user: User | null,
	minimumRole: (typeof HierarchyRole)[keyof typeof HierarchyRole] = 0
	// typeguard "user is User" means if the function return true, user will be an User (not null) in the same scope it follows the function
): user is User => {
	if (!user || !user.isActive) return false;
	return user.role ? HierarchyRole[user.role] <= minimumRole : false;
};

/**
 * @description a text replacer which return a string with %s replaced by your values in order
 */
export const sprintf = (str: string, ...args: string[]) => {
	return args.reduce((acc, curr) => acc.replace(/%s/, curr), str);
};

/**
 * @description flatten an array of objects with i18n entities
 * @todo add a correct typing
 */
export const flattenI18nEntities = (
  arr: Array<{ [k: string]: any; uuid: string; i18n: object[] }>
) => {
  // we spread the entity and get i18n outside of it
  return arr.map(({ i18n, ...entity }) => {
    return {
      ...entity,
      ...(i18n[0] ?? {}),
    };
  });
};
