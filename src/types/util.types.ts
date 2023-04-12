import type { ParticipantType } from "./team.types";

export type GroupedObjectType = {
  id: string;
  name?: string;
  group: string;
  points?: number;
  gameOrder?: number;
  smallPoints?: number;
  winners?: ParticipantType[];
};

export type GroupedMapType<T extends GroupedObjectType> = Map<string, T[]>;

export type GroupedPlayoffObjectType = {
  id: string;
  stage: string;
};

export type GroupedPlayoffMapType<T extends GroupedPlayoffObjectType> = Map<
  string,
  T[]
>;
