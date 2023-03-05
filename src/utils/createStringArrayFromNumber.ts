const createStringArrayFromNumber = (count: number) => {
  const strArray: string[] = [];

  for (let i = 0; i < count; i++) {
    strArray.push("");
  }

  return strArray;
};

export default createStringArrayFromNumber;
