import { type Player } from "@prisma/client";

const splitPlayerInGroups = (players: Player[]) => {
  const groups = new Set<string>();
  const playersByGroup = new Map<string, typeof players>();

  for (const player of players) {
    const playersInGroup = playersByGroup.get(player.group);

    if (playersInGroup) {
      playersInGroup.push(player);
      continue;
    }

    if (player.group) {
      playersByGroup.set(player.group, [player]);
      groups.add(player.group);
    }
  }

  return { groups: Array.from(groups), playersByGroup };
};

export default splitPlayerInGroups;
