import isOdd from "utils/isOdd";

const getPrevOddNumber = (num: number) => {
  if (isOdd(num)) return num;

  return num - 1;
};

export default getPrevOddNumber;
