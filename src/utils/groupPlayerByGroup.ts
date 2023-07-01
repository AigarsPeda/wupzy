import { type PlayerType } from "~/types/tournament.types";

const groupPlayerByGroup = (players: PlayerType[]) => {
  const groups = new Set<string>();
  const playersMap = new Map<string, PlayerType[]>();

  for (const player of players) {
    const teamsInGroup = playersMap.get(player.group);

    if (teamsInGroup) {
      teamsInGroup.push(player);
      continue;
    }

    if (player.group) {
      playersMap.set(player.group, [player]);
      groups.add(player.group);
    }
  }

  return { playersMap, groups: [...groups] };
};

export default groupPlayerByGroup;
