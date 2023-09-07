import { type PrismaClient } from "@prisma/client";

const getTournamentGames = async (
  prisma: PrismaClient,
  tournamentId: string
) => {
  const players = await prisma.player.findMany({
    where: {
      tournamentId,
    },
  });

  const playerGroups = new Set<string>();

  for (const player of players) {
    playerGroups.add(player.group);
  }

  return [...playerGroups];
};

export default getTournamentGames;
