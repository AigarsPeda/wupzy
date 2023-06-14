import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { GameSets } from "~/types/tournament.types";
import { GamesScoresSchema } from "~/types/utils.types";
import getWinsPerTeam from "~/utils/getWinsPerTeam";
import z from "zod";

export const gameRouter = createTRPCRouter({
  updateGame: protectedProcedure
    .input(GamesScoresSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const game = await prisma.game.findUnique({
        where: {
          id: input.gameId,
        },
      });

      if (!game) {
        throw new Error("Game not found");
      }

      const finishedGames = game.gameSets ? GameSets.parse(game.gameSets) : {};

      console.log("finishedGames 11 --->", finishedGames);

      const keys = Object.keys(finishedGames);

      finishedGames[keys.length + 1] = {
        teamOne: input.teamOneScore,
        teamTwo: input.teamTwoScore,
      };

      const { firstTeamWins, secondTeamWins } = getWinsPerTeam(
        finishedGames,
        input.teamOneScore,
        input.teamTwoScore
      );

      const updateGame = await prisma.game.update({
        where: {
          id: input.gameId,
        },
        data: {
          gameSets: finishedGames,
          teamOneSetScore: firstTeamWins,
          teamTwoSetScore: secondTeamWins,
        },
      });

      return { game: updateGame };
    }),

  getGames: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const games = await prisma.game.findMany({
        where: {
          tournamentId: input.id,
        },
        include: {
          teamOne: {
            include: {
              players: true,
            },
          },
          teamTwo: {
            include: {
              players: true,
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      });

      return { games };
    }),
});
