import type { ParticipantObjType } from "types/team.types";

type IdsArrayType = {
  id: string;
}[];

const createIdsArrays = async (
  gamesMap: Map<string, ParticipantObjType[]>,
  callback: (
    group: string,
    firsIds: IdsArrayType,
    secondIds: IdsArrayType,
    index: number
  ) => Promise<void>
) => {
  for (const group of gamesMap.keys()) {
    const gamesInGroup = gamesMap.get(group);

    if (!gamesInGroup) return;

    for (let i = 0; i < gamesInGroup.length; i++) {
      const game = gamesInGroup[i];

      if (!game) return;

      const firsIds = game.first.map((participant) => {
        return {
          id: participant.id,
        };
      });
      const secondIds = game.second.map((participant) => {
        return {
          id: participant.id,
        };
      });

      await callback(group, firsIds, secondIds, i);
    }
  }
};

export default createIdsArrays;
