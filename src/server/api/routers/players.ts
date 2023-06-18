import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const playerRouter = createTRPCRouter({
  getPlayers: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const players = await prisma.player.findMany({
        where: {
          tournamentId: input.id,
        },
        orderBy: [
          {
            gamesWon: "desc",
          },
          {
            setsWon: "desc",
          },
          {
            points: "desc",
          },
        ],
      });

      return { players };
    }),
});
