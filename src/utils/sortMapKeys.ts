const sortMapKeys = <T>(mapToSort: Map<string, T[]>): Map<string, T[]> => {
  const sortedKeys = Array.from(mapToSort.keys()).sort();
  const sortedMap = new Map<string, T[]>();

  sortedKeys.forEach((key) => {
    const value = mapToSort.get(key);

    if (value) {
      sortedMap.set(key, value);
    }
  });

  return sortedMap;
};

export default sortMapKeys;
