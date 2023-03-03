import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const participantRouter = createTRPCRouter({
  getTournamentParticipants: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const participants = await ctx.prisma.participant.findMany({
        where: {
          tournamentId: input.id,
        },
      });

      return { participants };
    }),

  addParticipant: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        group: z.string(),
        score: z.number(),
        tournamentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.prisma.participant.create({
        data: {
          name: input.name,
          group: input.group,
          score: input.score,
          tournamentId: input.tournamentId,
        },
      });

      return { team };
    }),

  getParticipantGames: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const games = await ctx.prisma.games.findMany({
        where: {
          id: input.id,
        },
        // include: {
        //   tournament: true,
        // },
      });

      return { games };
    }),

  deleteParticipant: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // const team = await ctx.prisma.participant.delete({
      //   where: {
      //     id: input.id,
      //   },
      // });
      // await ctx.prisma.participant.delete({
      //   where: {
      //     id: input.id,
      //   },
      // });
      // const games = await ctx.prisma.games.findMany({
      //   where: {
      //     OR: [
      //       {
      //         team_1_id: input.id,
      //       },
      //       {
      //         team_2_id: input.id,
      //       },
      //     ],
      //   },
      // });
      // await ctx.prisma.games.deleteMany({
      //   where: {
      //     OR: [
      //       {
      //         // team_1_id
      //         team_1_id: input.id,
      //       },
      //       {
      //         team2Id: input.id,
      //       },
      //     ],
      //   },
      // });
      // return { team };
    }),

  updateParticipant: protectedProcedure
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
        await ctx.prisma.participant.update({
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
