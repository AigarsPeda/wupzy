import type { GroupedObjectType, GroupedMapType } from "types/util.types";

const createMap = <T extends GroupedObjectType>(
  items: T[]
): GroupedMapType<T> => {
  return items.reduce((acc, item) => {
    const group = item.group;
    const groupItems = acc.get(group) || [];

    groupItems.push(item);
    acc.set(group, groupItems);

    groupItems.sort((a, b) => (a.gameOrder ?? 0) - (b.gameOrder ?? 0));

    return acc;
  }, new Map<string, T[]>());
};

export default createMap;
