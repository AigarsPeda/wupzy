import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const teamsRouter = createTRPCRouter({
  // getAllTournaments: protectedProcedure.query(async ({ ctx }) => {
  //   const tournaments = await ctx.prisma.tournament.findMany({
  //     where: {
  //       userId: ctx.user.id,
  //     },
  //   });

  //   return { tournaments };
  // }),

  getTournamentTeams: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      // const tournament = await ctx.prisma.tournament.findUnique({
      //   where: {
      //     id: input.tournamentId,
      //   },
      // });

      // if (!tournament) {
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "Tournament not found",
      //   });
      // }

      const teams = await ctx.prisma.team.findMany({
        where: {
          tournamentId: input.id,
        },
      });

      return { teams };
    }),
});
