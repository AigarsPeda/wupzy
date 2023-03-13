import type { Participant } from "@prisma/client";
import createAllNewPairsInGroup from "server/api/routers/utils/createAllNewPairsInGroup";
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
      // can we get all participants from the group?
      await ctx.prisma.participant.create({
        data: {
          name: input.name,
          group: input.group,
          score: input.score,
          tournamentId: input.tournamentId,
        },
      });

      // create new games with the new participant
      const participants = await ctx.prisma.participant.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
      });

      const oldGames = await ctx.prisma.games.findMany({
        where: {
          group: input.group,
          tournamentId: input.tournamentId,
        },
        include: {
          participant_team_1: true,
          participant_team_2: true,
        },
      });

      const newPairs = createAllNewPairsInGroup(
        participants,
        input.group,
        oldGames
      );

      // get games with last order number
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
      const gamesMap = createGames(newPairs);

      await createIdsArrays(
        gamesMap,
        async (group, firsIds, secondIds, index) => {
          await ctx.prisma.games.create({
            data: {
              group,
              gameOrder: lastGamesOrderNumber + 1 + index,
              tournamentId: input.tournamentId,
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

      // return { team };
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
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const games = await ctx.prisma.games.findMany({
        where: {
          OR: [
            {
              participant_team_1: {
                some: {
                  id: input.id,
                },
              },
            },
            {
              participant_team_2: {
                some: {
                  id: input.id,
                },
              },
            },
          ],
        },
      });

      await Promise.all(
        games.map((game) =>
          ctx.prisma.games.delete({
            where: {
              id: game.id,
            },
          })
        )
      );

      await ctx.prisma.participant.delete({ where: { id: input.id } });
    }),

  updateParticipantsGroup: protectedProcedure
    .input(
      z.object({
        teams: z
          .object({
            team: z.object({
              id: z.string(),
              name: z.string(),
              group: z.string(),
              score: z.number(),
            }),
            oldGroup: z.string(),
            newGroup: z.string(),
          })
          .array(),
        tournamentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedGroups = new Set<string>([]);

      for (const team of input.teams) {
        await ctx.prisma.participant.update({
          where: {
            id: team.team.id,
          },
          data: {
            group: team.newGroup,
            score: 0,
          },
        });

        await ctx.prisma.games.deleteMany({
          where: {
            tournamentId: input.tournamentId,
            group: team.oldGroup,
          },
        });

        await ctx.prisma.games.deleteMany({
          where: {
            tournamentId: input.tournamentId,
            group: team.newGroup,
          },
        });

        updatedGroups.add(team.oldGroup);
        updatedGroups.add(team.newGroup);
      }

      let participants: Participant[] = [];

      for (const group of updatedGroups) {
        const participantsInGroup = await ctx.prisma.participant.findMany({
          where: {
            group,
            tournamentId: input.tournamentId,
          },
        });

        await ctx.prisma.participant.updateMany({
          where: {
            group,
            tournamentId: input.tournamentId,
          },
          data: {
            score: 0,
          },
        });

        participants = [...participants, ...participantsInGroup];
      }

      const participantsMap = createAllPossiblePairsInGroup(participants);
      const gamesMap = createGames(participantsMap);

      await createIdsArrays(
        gamesMap,
        async (group, firsIds, secondIds, index) => {
          await ctx.prisma.games.create({
            data: {
              group,
              gameOrder: index + 1,
              tournamentId: input.tournamentId,
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
    }),
});
