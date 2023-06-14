import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { GameSchema, GameSets } from "~/types/tournament.types";

export const gameRouter = createTRPCRouter({
  updateGame: protectedProcedure
    .input(GameSchema)
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const finishedGames = input.gameSets
        ? GameSets.parse(input.gameSets)
        : {};

      const keys = Object.keys(finishedGames);

      finishedGames[keys.length + 1] = {
        teamOne: input.teamOneScore,
        teamTwo: input.teamTwoScore,
      };

      const game = await prisma.game.update({
        where: {
          id: input.id,
        },
        data: {
          gameSets: finishedGames,
          teamOneScore: input.teamOneScore,
          teamTwoScore: input.teamTwoScore,
        },
      });

      return { game };
    }),
});
