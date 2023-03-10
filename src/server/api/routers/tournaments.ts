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

      await createIdsArrays(
        gamesMap,
        async (group, firsIds, secondIds, index) => {
          // Save games to database
          await ctx.prisma.games.create({
            data: {
              group,
              gameOrder: index + 1,
              tournamentId: tournament.id,
              participant_team_1: {
                connect: [...firsIds],
              },
              participant_team_2: {
                connect: [...secondIds],
              },
            },
          });
        }
      );

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

  updateGame: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        team1Score: z.number(),
        team2Score: z.number(),
        winnerTeamIds: z.array(z.string()).nullable(),
        // winnerId: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const game = await ctx.prisma.games.update({
        where: {
          id: input.id,
        },
        data: {
          winnerIds: input.winnerTeamIds ?? undefined,
          team1Score: input.team1Score,
          team2Score: input.team2Score,
        },
        include: {
          participant_team_1: true,
          participant_team_2: true,
        },
      });

      for (const participant of game.participant_team_1) {
        await ctx.prisma.participant.update({
          where: {
            id: participant.id,
          },
          data: {
            score: participant.score + input.team1Score,
          },
        });
      }

      for (const participant of game.participant_team_2) {
        await ctx.prisma.participant.update({
          where: {
            id: participant.id,
          },
          data: {
            score: participant.score + input.team2Score,
          },
        });
      }

      return { game };
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
