export const excludeEntryFromArrayOfObjects = (arrayOfObjects: any[], keys: string[]) => {
    return arrayOfObjects.map((object) => {
        keys.forEach((key) => {
            delete object[key];
        })

        return object;
    })
}