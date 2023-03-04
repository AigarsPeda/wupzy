import type { GameType } from "types/team.types";

type IdsArrayType = {
  id: string;
}[];

const createIdsArrays = async (
  gamesMap: Map<string, GameType[]>,
  callback: (
    group: string,
    firsIds: IdsArrayType,
    secondIds: IdsArrayType
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

      await callback(group, firsIds, secondIds);
    }
  }
};

export default createIdsArrays;
