import { type Player, type PrismaClient, type Team } from "@prisma/client";

type UpdateTeamsScoreArgsType = {
  setsWon: number;
  teamScore: number;
  prisma: PrismaClient;
  winnerId: string | null;
  team: Team & {
    players: Player[];
  };
};

const updateTeamsScore = async ({
  team,
  prisma,
  setsWon,
  winnerId,
  teamScore,
}: UpdateTeamsScoreArgsType) => {
  const isWinner = team.id === winnerId;
  const points = team.points + teamScore;
  const gamesWon = isWinner ? team.gamesWon + 1 : team.gamesWon;

  await prisma.team.update({
    where: {
      id: team.id,
    },
    data: {
      points,
      setsWon,
      gamesWon,
    },
  });
};

export default updateTeamsScore;
