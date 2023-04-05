const getRandomValues = (num: number, myArray: string[]): string[] => {
  if (myArray.length === 1) {
    return [myArray[0] || "", myArray[0] || ""];
  }

  const randomValues: string[] = [];

  // Generate two random indexes
  const randomIndex1 = Math.floor(Math.random() * myArray.length);
  let randomIndex2 = Math.floor(Math.random() * myArray.length);

  // Ensure the two indexes are not the same
  while (randomIndex2 === randomIndex1) {
    randomIndex2 = Math.floor(Math.random() * myArray.length);
  }

  // Push the values at the two random indexes to the randomValues array
  randomValues.push(myArray[randomIndex1] || "");
  randomValues.push(myArray[randomIndex2] || "");

  // Return the randomValues array
  return randomValues;
};

export default getRandomValues;
