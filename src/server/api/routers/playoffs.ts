import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { PlayGameSchema } from "~/types/playoff.types";

export const playoffsRouter = createTRPCRouter({
  createPlayoffGames: protectedProcedure
    .input(
      z.object({
        playoffGames: z.array(PlayGameSchema),
        tournamentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: create playoff games
      console.log("createPlayoffGames", input);

      const { prisma } = ctx;

      // const playoffGames = await prisma.playoffGame.createMany({
      //   data: input.playoffGames,
      // });

      for (const playoffGame of input.playoffGames) {
        await prisma.playoffGame.create({
          data: {
            // id: playoffGame.id,
            match: playoffGame.match,
            round: playoffGame.round,
            teamOne: {
              connect: {
                id: playoffGame.teams[0]?.id,
              },
            },
            teamTwo: {
              connect: {
                id: playoffGame.teams[1]?.id,
              },
            },
            tournament: {
              connect: {
                id: input.tournamentId,
              },
            },
            // tournamentId: "1",
          },
        });
      }
    }),
});
