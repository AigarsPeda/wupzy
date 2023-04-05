import type { GroupedObjectType, GroupedMapType } from "../types/util.types";

const getShortestGroup = <T extends GroupedObjectType>(
  items: GroupedMapType<T>
): number => {
  const groups = [...items].map(([, groupItems]) => groupItems.length);
  return Math.min(...groups);
};

export default getShortestGroup;
