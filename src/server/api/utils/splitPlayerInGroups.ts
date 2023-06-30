import { type Player } from "@prisma/client";

const splitPlayerInGroups = (players: Player[]) => {
  const playersByGroup = new Map<string, typeof players>();

  for (const player of players) {
    const playersInGroup = playersByGroup.get(player.group);

    if (playersInGroup) {
      playersInGroup.push(player);
      continue;
    }

    if (player.group) {
      playersByGroup.set(player.group, [player]);
    }
  }

  return playersByGroup;
};

export default splitPlayerInGroups;
