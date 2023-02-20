import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const teamsRouter = createTRPCRouter({
  getTournamentTeams: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const teams = await ctx.prisma.team.findMany({
        where: {
          tournamentId: input.id,
        },
      });

      return { teams };
    }),

  updateTeam: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        group: z.string(),
        score: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const team = await ctx.prisma.team.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          group: input.group,
          score: input.score,
        },
      });

      return { team };
    }),
});
