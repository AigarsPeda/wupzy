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
  const updateGameWon = () => {
    if (oldWinnerId === newWinnerId) {
      return { decrement: 0 };
    }

    if (team.id === newWinnerId && oldWinnerId !== newWinnerId) {
      return { increment: 1 };
    }

    return { decrement: 1 };
  };

  await prisma.team.update({
    where: {
      id: team.id,
    },
    data: {
      setsWon: teamsWins,
      gamesWon: updateGameWon(),
      points: team.points - teamsOldScore + teamsNewScore,
    },
  });

  for (const player of team.players) {
    await prisma.player.update({
      where: {
        id: player.id,
      },
      data: {
        setsWon: teamsWins,
        gamesWon: updateGameWon(),
        points: team.points - teamsOldScore + teamsNewScore,
      },
    });
  }
};

export default editTeamsScore;
