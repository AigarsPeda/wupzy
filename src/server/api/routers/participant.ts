import createIdsArrays from "server/api/routers/utils/createIdsArrays";
import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import createAllPossiblePairsInGroup from "utils/createAllPossiblePairsInGroup";
import createGames from "utils/createGames";
import createParticipantMap from "utils/createParticipantMap";
import { z } from "zod";

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

      const participantsMap = createAllPossiblePairsInGroup(
        allParticipants,
        newParticipant.group
      );
      const gamesMap = createGames(participantsMap, newParticipant);

      const lastGamesOrderNumber = lastOrderNumber[0]?.gameOrder || 0;

      await createIdsArrays(
        gamesMap,
        async (group, firsIds, secondIds, index) => {
          const team1 = await ctx.prisma.team.create({
            data: {
              name: `Team 1`,
              tournamentId: input.tournamentId,
              participants: {
                connect: [...firsIds],
              },
            },
          });

          const team2 = await ctx.prisma.team.create({
            data: {
              name: `Team 2`,
              tournamentId: input.tournamentId,
              participants: {
                connect: [...secondIds],
              },
            },
          });

          await ctx.prisma.games.create({
            data: {
              group,
              gameOrder: lastGamesOrderNumber + 1 + index,
              tournamentId: input.tournamentId,
              team1Id: team1.id,
              team2Id: team2.id,
            },
          });
        }
      );
    }),

  updatedParticipant: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        score: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const participant = await ctx.prisma.participant.update({
        where: {
          id: input.id,
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
          team1: {
            participants: {
              some: {
                id: input.participant.id,
              },
            },
          },
        },
      });

      await ctx.prisma.games.deleteMany({
        where: {
          group: group,
          tournamentId: input.tournamentId,
          team2: {
            participants: {
              some: {
                id: input.participant.id,
              },
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
        team: z.object({
          id: z.string(),
          name: z.string(),
          group: z.string(),
          score: z.number(),
        }),
        oldGroup: z.string(),
        newGroup: z.string(),
        tournamentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.games.deleteMany({
        where: {
          group: input.oldGroup,
          tournamentId: input.tournamentId,
          team1: {
            participants: {
              some: {
                id: input.team.id,
              },
            },
          },
        },
      });

      await ctx.prisma.games.deleteMany({
        where: {
          group: input.oldGroup,
          tournamentId: input.tournamentId,
          team2: {
            participants: {
              some: {
                id: input.team.id,
              },
            },
          },
        },
      });

      const updatedParticipant = await ctx.prisma.participant.update({
        where: {
          id: input.team.id,
        },
        data: {
          group: input.newGroup,
          score: 0,
        },
      });

      const allParticipants = await ctx.prisma.participant.findMany({
        where: {
          group: input.newGroup,
          tournamentId: input.tournamentId,
        },
      });

      const lastOrderNumber = await ctx.prisma.games.findMany({
        where: {
          group: input.newGroup,
          tournamentId: input.tournamentId,
        },
        orderBy: {
          gameOrder: "desc",
        },
        take: 1,
      });

      const lastGamesOrderNumber = lastOrderNumber[0]?.gameOrder || 0;
      const participantsMap = createAllPossiblePairsInGroup(
        allParticipants,
        input.newGroup
      );
      const gamesMap = createGames(participantsMap, updatedParticipant);

      await createIdsArrays(
        gamesMap,
        async (group, firsIds, secondIds, index) => {
          const team1 = await ctx.prisma.team.create({
            data: {
              name: `Team 1`,
              tournamentId: input.tournamentId,
              participants: {
                connect: [...firsIds],
              },
            },
          });

          const team2 = await ctx.prisma.team.create({
            data: {
              name: `Team 2`,
              tournamentId: input.tournamentId,
              participants: {
                connect: [...secondIds],
              },
            },
          });

          await ctx.prisma.games.create({
            data: {
              group,
              gameOrder: lastGamesOrderNumber + 1 + index,
              tournamentId: input.tournamentId,
              team1Id: team1.id,
              team2Id: team2.id,
            },
          });
        }
      );
    }),
});
