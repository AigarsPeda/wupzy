export type GroupedObjectType = {
  group: string;
  points?: number;
  gameOrder?: number;
  smallPoints?: number;
};

export type GroupedMapType<T extends GroupedObjectType> = Map<string, T[]>;
