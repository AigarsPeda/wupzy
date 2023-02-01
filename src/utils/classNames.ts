// Filter string and return only string with true value
export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
