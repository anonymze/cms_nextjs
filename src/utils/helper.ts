// pause the thread for a given time
export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

// exclude some keys of an array of objects
export const excludeEntryFromArrayOfObjects = (arrayOfObjects: any[], keys: string[]) => {
  return arrayOfObjects.map((object) => {
    keys.forEach((key) => {
      delete object[key];
    });

    return object;
  });
};

export const getKeysTypedObject = Object.keys as <T extends object>(obj: T) => Array<keyof T>