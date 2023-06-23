import { type Player, type PrismaClient, type Team } from "@prisma/client";

type EditTeamsScoreArgsType = {
  team: Team & {
    players: Player[];
  };
  teamsWins: number;
  prisma: PrismaClient;
  teamsOldScore: number;
  teamsNewScore: number;
  oldWinnerId: string | null;
  newWinnerId: string | null;
};

const editTeamsScore = async ({
  team,
  prisma,
  teamsWins,
  newWinnerId,
  oldWinnerId,
  teamsOldScore,
  teamsNewScore,
}: EditTeamsScoreArgsType) => {
  await prisma.team.update({
    where: {
      id: team.id,
    },
    data: {
      points: team.points - teamsOldScore + teamsNewScore,
      setsWon: teamsWins,
      gamesWon:
        team.id === newWinnerId && oldWinnerId !== newWinnerId
          ? { increment: oldWinnerId ? 1 : 0 }
          : { decrement: oldWinnerId ? 1 : 0 },
    },
  });

  for (const player of team.players) {
    await prisma.player.update({
      where: {
        id: player.id,
      },
      data: {
        points: team.points - teamsOldScore + teamsNewScore,
        setsWon: teamsWins,
        gamesWon:
          team.id === newWinnerId && oldWinnerId !== newWinnerId
            ? { increment: oldWinnerId ? 1 : 0 }
            : { decrement: oldWinnerId ? 1 : 0 },
      },
    });
  }
};

export default editTeamsScore;
