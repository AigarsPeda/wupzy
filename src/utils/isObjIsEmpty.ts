const isObjIsEmpty = (obj: { [key: string]: unknown } | null) => {
  if (!obj) {
    return true;
  }

  return Object.keys(obj).length === 0;
};

export default isObjIsEmpty;
