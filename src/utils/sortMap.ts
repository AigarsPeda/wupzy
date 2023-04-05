import type { GroupedMapType, GroupedObjectType } from "types/util.types";

const sortMap = <T extends GroupedObjectType>(
  items: GroupedMapType<T>
): GroupedMapType<T> => {
  return new Map(
    [...items].map(([group, groupItems]) => {
      groupItems.sort((a, b) => {
        if (a.points === b.points) {
          return (b.smallPoints ?? 0) - (a.smallPoints ?? 0);
        }
        return (b.points ?? 0) - (a.points ?? 0);
      });
      return [group, groupItems];
    })
  );
};

export default sortMap;
