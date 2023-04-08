export type GroupedObjectType = {
  stage: string;
};

export type GroupedMapType<T extends GroupedObjectType> = Map<string, T[]>;

const createPlayoffMap = <T extends GroupedObjectType>(
  items: T[]
): GroupedMapType<T> => {
  return items.reduce((acc, item) => {
    const stage = item.stage;
    const groupItems = acc.get(stage) || [];

    groupItems.push(item);
    acc.set(stage, groupItems);

    return acc;
  }, new Map<string, T[]>());
};

export default createPlayoffMap;
