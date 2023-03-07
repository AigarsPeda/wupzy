import { TRPCError } from "@trpc/server";
import createIdsArrays from "server/api/routers/utils/createIdsArrays";
import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import createAllPossiblePairsInGroup from "utils/createAllPossiblePairsInGroup";
import createGames from "utils/createGames";
import { z } from "zod";

export const tournamentsRouter = createTRPCRouter({
  getAllTournaments: protectedProcedure.query(async ({ ctx }) => {
    const tournaments = await ctx.prisma.tournament.findMany({
      where: {
        userId: ctx.user.id,
      },
    });

    return { tournaments };
  }),

  createTournament: protectedProcedure
    .input(z.object({ name: z.string(), attendants: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.create({
        data: {
          name: input.name,
          userId: ctx.user.id,
        },
      });

      for (const attendant of input.attendants) {
        await ctx.prisma.participant.create({
          data: {
            group: "A",
            name: attendant,
            tournamentId: tournament.id,
          },
        });
      }

      const participants = await ctx.prisma.participant.findMany({
        where: {
          tournamentId: tournament.id,
        },
      });

      const participantsMap = createAllPossiblePairsInGroup(participants);
      const gamesMap = createGames(participantsMap);

      await createIdsArrays(gamesMap, async (group, firsIds, secondIds) => {
        // Save games to database
        await ctx.prisma.games.create({
          data: {
            group,
            tournamentId: tournament.id,
            participant_team_1: {
              connect: [...firsIds],
            },
            participant_team_2: {
              connect: [...secondIds],
            },
          },
        });
      });

      return { tournament };
    }),

  getTournamentGames: protectedProcedure
    .input(z.object({ id: z.string(), group: z.string().nullish() }))
    .query(async ({ ctx, input }) => {
      const games = await ctx.prisma.games.findMany({
        where: {
          group: input.group ?? undefined,
          tournamentId: input.id,
        },
        include: {
          participant_team_1: true,
          participant_team_2: true,
        },
      });

      return { games };
    }),

  getTournamentById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!tournament) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tournament not found",
        });
      }

      return { tournament };
    }),

  updateTournament: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });

      return { tournament };
    }),
});
