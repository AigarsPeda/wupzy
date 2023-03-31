import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import { z } from "zod";

export const participantRouter = createTRPCRouter({
  updatedParticipant: protectedProcedure
    .input(
      z.object({
        participantId: z.string(),
        name: z.string().optional(),
        score: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const participant = await ctx.prisma.participant.update({
        where: {
          id: input.participantId,
        },
        data: {
          name: input.name,
          score: input.score,
        },
      });

      return { participant };
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
      });

      return { games };
    }),

  deleteParticipant: protectedProcedure
    .input(
      z.object({
        participant: z.object({
          id: z.string(),
          name: z.string(),
          group: z.string(),
          score: z.number(),
        }),
        tournamentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const group = input.participant.group;

      await ctx.prisma.games.deleteMany({
        where: {
          group: group,
          tournamentId: input.tournamentId,
          participants: {
            some: {
              id: input.participant.id,
            },
          },
        },
      });

      await ctx.prisma.participant.delete({
        where: {
          id: input.participant.id,
        },
      });
    }),
});
