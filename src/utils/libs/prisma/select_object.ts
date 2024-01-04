// to only get the field we ask from the bdd (we force to not have id)

export const getSelectObject = (fields: string[]) => {
  const selectObject: Record<string, boolean> = { id: false };

  fields.forEach((field) => {
    if (field === "id") {
      return;
    }

    selectObject[field] = true;
  });

  return selectObject;
};
