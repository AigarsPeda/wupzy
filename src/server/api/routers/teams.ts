import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
        include: {
          players: true,
        },
      });

      return { teams };
    }),
});
