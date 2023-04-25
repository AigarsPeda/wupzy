import { TRPCError } from "@trpc/server";
import createParticipantMap from "server/api/routers/utils/createParticipantMap";
import getPoints from "server/api/routers/utils/getPoints";
import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import { GamesZodSchema } from "types/game.types";
import { z } from "zod";

export const tournamentsRouter = createTRPCRouter({
  getAllTournaments: protectedProcedure.query(async ({ ctx }) => {
    const tournaments = await ctx.prisma.tournament.findMany({
      where: {
        userId: ctx.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { tournaments };
  }),

  getAllTournamentParticipants: protectedProcedure
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
        orderBy: {
          group: "asc",
        },
      });

      const sorted = createParticipantMap(participants);

      return { participants: sorted };
    }),

  getAllTournamentGames: protectedProcedure
    .input(z.object({ tournamentId: z.string(), group: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const games = await ctx.prisma.games.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
        orderBy: {
          gameOrder: "asc",
        },
        include: {
          team1: {
            include: {
              participants: true,
            },
          },
          team2: {
            include: {
              participants: true,
            },
          },
          tournament: {
            select: {
              setsInGame: true,
            },
          },
          winners: true,
        },
      });

      return { games };
    }),

  getAllTournamentTeams: protectedProcedure
    .input(z.object({ tournamentId: z.string(), group: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const teams = await ctx.prisma.team.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
        include: {
          participants: true,
        },
      });

      return { teams };
    }),

  updateGameOrder: protectedProcedure
    .input(
      z.object({
        games: GamesZodSchema.array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction(
        input.games.map((game) => {
          return ctx.prisma.games.update({
            where: {
              id: game.id,
            },
            data: {
              gameOrder: game.gameOrder,
            },
          });
        })
      );
    }),

  updateGameScore: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        team1Score: z.number(),
        team2Score: z.number(),
        tournamentId: z.string(),
        winnerTeamIds: z.array(z.string()).optional(),
        setResults: z.record(
          z.string(),
          z.object({
            firstTeam: z.number(),
            secondTeam: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const winnerIds = input.winnerTeamIds?.map((id) => {
        return {
          id: id,
        };
      });

      const { team1Points, team2Points } = getPoints(
        input.team1Score,
        input.team2Score
      );

      const game = await ctx.prisma.games.update({
        where: {
          id: input.id,
        },
        data: {
          gameSet: {
            increment: 1,
          },
          team1Score: input.team1Score,
          team2Score: input.team2Score,
          gameSets: input.setResults,
          team1: {
            update: {
              points: {
                increment: winnerIds?.length && team1Points,
              },
              smallPoints: {
                increment: input.team1Score,
              },
            },
          },
          team2: {
            update: {
              points: {
                increment: winnerIds?.length && team2Points,
              },
              smallPoints: {
                increment: input.team2Score,
              },
            },
          },
          winners: {
            connect: winnerIds,
          },
        },

        include: {
          team1: {
            include: {
              participants: true,
            },
          },
          team2: {
            include: {
              participants: true,
            },
          },
        },
      });

      for (const participant of game.team1.participants) {
        await ctx.prisma.participant.update({
          where: {
            id: participant.id,
          },
          data: {
            points: participant.points + team1Points,
            smallPoints: participant.smallPoints + input.team1Score,
          },
        });
      }

      for (const participant of game.team2.participants) {
        await ctx.prisma.participant.update({
          where: {
            id: participant.id,
          },
          data: {
            points: participant.points + team2Points,
            smallPoints: participant.smallPoints + input.team2Score,
          },
        });
      }

      return { game };
    }),

  getTournamentById: protectedProcedure
    .input(z.object({ tournamentId: z.string() }))
    .query(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.findUnique({
        where: {
          id: input.tournamentId,
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

  deleteTournament: protectedProcedure
    .input(z.object({ tournamentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction([
        ctx.prisma.games.deleteMany({
          where: {
            tournamentId: input.tournamentId,
          },
        }),

        ctx.prisma.playoffGames.deleteMany({
          where: {
            tournamentId: input.tournamentId,
          },
        }),

        ctx.prisma.team.deleteMany({
          where: {
            tournamentId: input.tournamentId,
          },
        }),

        ctx.prisma.participant.deleteMany({
          where: {
            tournamentId: input.tournamentId,
          },
        }),

        ctx.prisma.tournament.delete({
          where: {
            id: input.tournamentId,
          },
        }),
      ]);
    }),
});
