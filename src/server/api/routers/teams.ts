import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import updatePlayerScores from "~/server/api/utils/updatePlayerScores";
import { GamesScoresSchema } from "~/types/utils.types";
import createGameSetJson from "~/utils/createGameSetJson";

export const teamRouter = createTRPCRouter({
  getTeams: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const teams = await prisma.team.findMany({
        where: {
          tournamentId: input.id,
        },
        // include: {
        //   players: true,
        // },
      });

      // const games = await prisma.game.findMany({
      //   where: {
      //     tournamentId: input.id,
      //   },
      //   include: {
      //     teamOne: {
      //       include: {
      //         players: true,
      //       },
      //     },
      //     teamTwo: {
      //       include: {
      //         players: true,
      //       },
      //     },
      //   },
      //   orderBy: [{ round: "asc" }, { order: "asc" }],
      // });

      // return { games };

      return { teams };
    }),
});
