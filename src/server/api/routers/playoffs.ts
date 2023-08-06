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
      const { prisma } = ctx;

      for (const playoffGame of input.playoffGames) {
        const [teamOne, teamTwo] = playoffGame.teams;

        await prisma.playoffGame.create({
          data: {
            match: playoffGame.match,
            round: playoffGame.round,

            ...(teamOne &&
              teamOne.id !== "" && {
                teamOne: {
                  connect: {
                    id: teamOne?.id,
                  },
                },
              }),
            ...(teamTwo &&
              teamTwo.id !== "" && {
                teamTwo: {
                  connect: {
                    id: teamTwo?.id,
                  },
                },
              }),
            tournament: {
              connect: {
                id: input.tournamentId,
              },
            },
          },
        });
      }

      await prisma.tournament.update({
        where: {
          id: input.tournamentId,
        },
        data: {
          isPlayoffs: true,
        },
      });

      return { success: true };
    }),
});
