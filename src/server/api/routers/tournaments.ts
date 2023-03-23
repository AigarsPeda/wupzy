import { TRPCError } from "@trpc/server";
import createIdsArrays from "server/api/routers/utils/createIdsArrays";
import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import createAllPossiblePairsInGroup from "utils/createAllPossiblePairsInGroup";
import createGames from "utils/createGames";
import { z } from "zod";
import { GamesZodSchema } from "../../../types/game.types";

const START_GROUP = "A";

export const tournamentsRouter = createTRPCRouter({
  getAllTournaments: protectedProcedure.query(async ({ ctx }) => {
    const tournaments = await ctx.prisma.tournament.findMany({
      where: {
        userId: ctx.user.id,
      },
    });

    return { tournaments };
  }),

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

      const participants = await ctx.prisma.participant.findMany({
        where: {
          tournamentId: tournament.id,
        },
      });

      const participantsMap = createAllPossiblePairsInGroup(
        participants,
        START_GROUP
      );
      const gamesMap = createGames(participantsMap);

      await createIdsArrays(
        gamesMap,
        async (group, firsIds, secondIds, index) => {
          const team1 = await ctx.prisma.team.create({
            data: {
              name: `Team 1`,
              tournamentId: tournament.id,
              participants: {
                connect: [...firsIds],
              },
            },
          });

          const team2 = await ctx.prisma.team.create({
            data: {
              name: `Team 2`,
              tournamentId: tournament.id,
              participants: {
                connect: [...secondIds],
              },
            },
          });

          await ctx.prisma.games.create({
            data: {
              group,
              gameOrder: index + 1,
              tournamentId: tournament.id,
              team1Id: team1.id,
              team2Id: team2.id,
              participants: {
                connect: [...firsIds, ...secondIds],
              },
            },
          });
        }
      );

      return { tournament };
    }),

  getTournamentGames: protectedProcedure
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
          winners: true,
        },
      });

      return { games };
    }),

  updateGameOrder: protectedProcedure
    .input(
      z.object({
        // group: z.string(),
        // tournamentId: z.string(),
        games: GamesZodSchema.array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // update games

      console.log("input.games ---> ", input.games);

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

      // Update game
      // await ctx.prisma.games.update({
      //   where: {
      //     id: input.id,
      //   },
      //   data: {
      //     gameOrder: input.order,
      //   },
      // });

      // // Get all games
      // const games = await ctx.prisma.games.findMany({
      //   where: {
      //     group: input.group,
      //     tournamentId: input.tournamentId,
      //   },
      //   orderBy: {
      //     gameOrder: "asc",
      //   },
      // });

      // // Find updated game
      // const updateGame = games.find((game) => game.id === input.id);

      // // Update all games after updated game
      // if (updateGame) {
      //   const updateGameIndex = games.indexOf(updateGame);

      //   for (let i = updateGameIndex; i < games.length; i++) {
      //     const game = games[i];

      //     if (game) {
      //       await ctx.prisma.games.update({
      //         where: {
      //           id: game.id,
      //         },
      //         data: {
      //           gameOrder: i + 1,
      //         },
      //       });
      //     }
      //   }
      // }
    }),

  updateGamScore: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        team1Score: z.number(),
        team2Score: z.number(),
        winnerTeamIds: z.array(z.string()).nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const winnerIds = input.winnerTeamIds?.map((id) => {
        return {
          id: id,
        };
      });

      const game = await ctx.prisma.games.update({
        where: {
          id: input.id,
        },
        data: {
          team1Score: input.team1Score,
          team2Score: input.team2Score,
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
            score: participant.score + input.team1Score,
          },
        });
      }

      for (const participant of game.team2.participants) {
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
