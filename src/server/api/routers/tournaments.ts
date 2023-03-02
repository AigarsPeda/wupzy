import { TRPCError } from "@trpc/server";
import { z } from "zod";
import createAllPossiblePairsInGroup from "utils/createAllPossiblePairsInGroup";
import createGames from "utils/createGames";
import { createTRPCRouter, protectedProcedure } from "../trpc";

type IdsType = {
  id: string;
};

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

        const idsArray: IdsType[] = [];

        if (!gamesInGroup) return;

        for (let i = 0; i < gamesInGroup.length; i++) {
          const game = gamesInGroup[i];

          if (!game) return;

          for (const item in game) {
            const p = game[item as keyof typeof game];

            const ids = p.map((participant) => {
              return {
                id: participant.id,
              };
            });

            idsArray.push(...ids);
          }

          await ctx.prisma.games.create({
            data: {
              group,
              team1score: 0,
              team2score: 0,
              tournamentId: tournament.id,
              participant: {
                connect: [...idsArray],
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
