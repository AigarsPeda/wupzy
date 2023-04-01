import createAllPossibleKingGames from "server/api/routers/utils/createAllPossibleKingGames";
import filterAllPossibleKingGames from "server/api/routers/utils/filterAllPossibleKingGames";
import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import shuffleArray from "utils/shuffleArray";
import { z } from "zod";

const START_GROUP = "A";

export const kingTournamentsRouter = createTRPCRouter({
  createKingTournament: protectedProcedure
    .input(z.object({ name: z.string(), attendants: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.create({
        data: {
          name: input.name,
          userId: ctx.user.id,
        },
      });

      const data = input.attendants.map((attendant) => {
        return {
          name: attendant,
          group: START_GROUP,
          tournamentId: tournament.id,
        };
      });

      await ctx.prisma.participant.createMany({
        data,
      });

      const allParticipants = await ctx.prisma.participant.findMany({
        where: {
          tournamentId: tournament.id,
        },
      });

      const games = createAllPossibleKingGames(allParticipants);
      const shuffledGames = shuffleArray(games);

      for (const game of shuffledGames) {
        let order = 1;

        const team1 = await ctx.prisma.team.create({
          data: {
            name: "Team 1",
            group: START_GROUP,
            tournamentId: tournament.id,
            participants: {
              connect: game?.first,
            },
          },
        });

        const team2 = await ctx.prisma.team.create({
          data: {
            name: "Team 2",
            group: START_GROUP,
            tournamentId: tournament.id,
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
            group: START_GROUP,
            tournamentId: tournament.id,
            participants: {
              connect: [...game?.first, ...game?.second],
            },
          },
        });

        order++;
      }

      return { tournament };
    }),

  changeParticipantsGroup: protectedProcedure
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
          smallPoints: 0,
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
          smallPoints: input.score,
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
});
