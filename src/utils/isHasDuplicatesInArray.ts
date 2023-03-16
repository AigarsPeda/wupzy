const isDuplicatesObjInArray = <T>(array: T[], property: keyof T): boolean => {
  const valuesSoFar = new Set();

  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    if (!value) return false;

    if (valuesSoFar.has(value[property])) return true;

    valuesSoFar.add(value[property]);
  }

  return false;
};

export default isDuplicatesObjInArray;
