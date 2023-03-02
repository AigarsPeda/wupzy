import { TRPCError } from "@trpc/server";
import { z } from "zod";
import createAllPossiblePairsInGroup from "../../../utils/createAllPossiblePairsInGroup";
import createGames from "../../../utils/createGames";

import { createTRPCRouter, protectedProcedure } from "../trpc";

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
      const games = createGames(participantsMap);

      for (const group of games.keys()) {
        const gamesInGroup = games.get(group);

        if (!gamesInGroup) return;

        for (let i = 0; i < gamesInGroup.length; i++) {
          const game = gamesInGroup[i];

          await ctx.prisma.games.create({
            data: {
              team1score: 0,
              team2score: 0,
              tournamentId: tournament.id,
              group,
              participant: {
                connect: [
                  {
                    id: game?.first[0]?.id,
                  },
                  {
                    id: game?.second[1]?.id,
                  },
                  {
                    id: game?.second[0]?.id,
                  },
                  {
                    id: game?.second[1]?.id,
                  },
                ],
              },
            },
          });
        }
      }

      return { tournament };
    }),

  getTournament: protectedProcedure
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
});
