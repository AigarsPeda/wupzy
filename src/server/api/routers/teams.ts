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
        teams: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            group: z.string(),
            score: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      for (const team of input.teams) {
        await ctx.prisma.team.update({
          where: {
            id: team.id,
          },
          data: {
            name: team.name,
            group: team.group,
            score: team.score,
          },
        });
      }

      return { teams: input.teams };
    }),
});
