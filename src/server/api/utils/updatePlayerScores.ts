import { type Player, type PrismaClient, type Team } from "@prisma/client";

type UpdatePlayerScoresArgsType = {
  setsWon: number;
  teamScore: number;
  prisma: PrismaClient;
  winner: string | null;
  team: Team & {
    players: Player[];
  };
};

const updatePlayerScores = async ({
  team,
  prisma,
  winner,
  setsWon,
  teamScore,
}: UpdatePlayerScoresArgsType) => {
  for (const player of team.players) {
    const isWinner = team.id === winner;
    const newPoints = teamScore + player.points;

    await prisma.player.update({
      where: {
        id: player.id,
      },
      data: {
        setsWon,
        points: newPoints,
        gamesWon: isWinner ? player.gamesWon + 1 : player.gamesWon,
      },
    });
  }
};

export default updatePlayerScores;
