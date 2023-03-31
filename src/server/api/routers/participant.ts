import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import createAllPossibleKingGames from "utils/createAllPossibleKingGames";
import createParticipantMap from "utils/createParticipantMap";
import filterAllPossibleKingGames from "utils/filterAllPossibleKingGames";
import { z } from "zod";
import shuffleArray from "../../../utils/shuffleArray";

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
        orderBy: {
          group: "asc",
        },
      });

      const sorted = createParticipantMap(participants);

      return { participants: sorted };
    }),

  addParticipantToGroup: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        group: z.string(),
        score: z.number(),
        tournamentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newParticipant = await ctx.prisma.participant.create({
        data: {
          name: input.name,
          group: input.group,
          score: input.score,
          tournamentId: input.tournamentId,
        },
      });

      const allParticipants = await ctx.prisma.participant.findMany({
        where: {
          tournamentId: input.tournamentId,
          group: input.group,
        },
      });

      const games = createAllPossibleKingGames(allParticipants);
      const filteredGames = filterAllPossibleKingGames(newParticipant, games);
      const shuffledGames = shuffleArray(filteredGames);

      const lastOrderNumber = await ctx.prisma.games.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
        orderBy: {
          gameOrder: "desc",
        },
        take: 1,
      });

      const lastGamesOrderNumber = lastOrderNumber[0]?.gameOrder || 0;

      for (const game of shuffledGames) {
        let order = lastGamesOrderNumber + 1;

        const team1 = await ctx.prisma.team.create({
          data: {
            name: "Team 1",
            group: input.group,
            tournamentId: input.tournamentId,
            participants: {
              connect: game?.first,
            },
          },
        });

        const team2 = await ctx.prisma.team.create({
          data: {
            name: "Team 2",
            group: input.group,
            tournamentId: input.tournamentId,
            participants: {
              connect: game?.second,
            },
          },
        });

        await ctx.prisma.games.create({
          data: {
            gameOrder: order,
            team1Id: team1.id,
            team2Id: team2.id,
            group: input.group,
            tournamentId: input.tournamentId,
            participants: {
              connect: [...game?.first, ...game?.second],
            },
          },
        });

        order++;
      }
    }),

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

  updateParticipantsGroup: protectedProcedure
    .input(
      z.object({
        group: z.string(),
        tournamentId: z.string(),
        participantId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.games.deleteMany({
        where: {
          tournamentId: input.tournamentId,
          participants: {
            some: {
              id: input.participantId,
            },
          },
        },
      });

      const newParticipant = await ctx.prisma.participant.update({
        where: {
          id: input.participantId,
        },
        data: {
          score: 0,
          group: input.group,
        },
      });

      const allParticipants = await ctx.prisma.participant.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
      });

      const games = createAllPossibleKingGames(allParticipants);
      const filteredGames = filterAllPossibleKingGames(newParticipant, games);
      const shuffledGames = shuffleArray(filteredGames);

      const lastOrderNumber = await ctx.prisma.games.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
        orderBy: {
          gameOrder: "desc",
        },
        take: 1,
      });

      const lastGamesOrderNumber = lastOrderNumber[0]?.gameOrder || 0;

      for (const game of shuffledGames) {
        let order = lastGamesOrderNumber + 1;

        const team1 = await ctx.prisma.team.create({
          data: {
            name: "Team 1",
            group: input.group,
            tournamentId: input.tournamentId,
            participants: {
              connect: game?.first,
            },
          },
        });

        const team2 = await ctx.prisma.team.create({
          data: {
            name: "Team 2",
            group: input.group,
            tournamentId: input.tournamentId,
            participants: {
              connect: game?.second,
            },
          },
        });

        await ctx.prisma.games.create({
          data: {
            gameOrder: order,
            team1Id: team1.id,
            team2Id: team2.id,
            group: input.group,
            tournamentId: input.tournamentId,
            participants: {
              connect: [...game?.first, ...game?.second],
            },
          },
        });

        order++;
      }
    }),
});
