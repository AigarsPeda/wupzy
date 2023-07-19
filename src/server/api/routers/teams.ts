import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import createGamesNTimes from "~/server/api/utils/createGamesNTimes";
import { TeamSchema } from "~/types/tournament.types";

export const teamRouter = createTRPCRouter({
  getTeams: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const teams = await prisma.team.findMany({
        where: {
          tournamentId: input.id,
        },
        include: {
          players: true,
        },
        orderBy: [
          {
            gamesWon: "desc",
          },
          {
            setsWon: "desc",
          },
          {
            points: "desc",
          },
        ],
      });

      return { teams };
    }),

  splitTeamsInGroups: protectedProcedure
    .input(z.object({ tournamentId: z.string(), teams: z.array(TeamSchema) }))
    .mutation(async ({ ctx, input }) => {
      // delete all games from this tournament
      const { prisma } = ctx;

      const tournament = await prisma.tournament.findUnique({
        where: {
          id: input.tournamentId,
        },
      });

      if (!tournament) {
        throw new Error("Tournament not found");
      }

      await prisma.game.deleteMany({
        where: {
          tournamentId: tournament.id,
        },
      });

      // update teams
      for (const team of input.teams) {
        await prisma.team.update({
          where: {
            id: team.id,
          },
          data: {
            points: 0,
            setsWon: 0,
            gamesWon: 0,
            group: team.group,
            tournamentId: tournament.id,
          },
        });

        for (const player of team.players) {
          await prisma.player.update({
            where: {
              id: player.id,
            },
            data: {
              points: 0,
              setsWon: 0,
              gamesWon: 0,
              group: team.group,
              tournamentId: tournament.id,
            },
          });
        }
      }

      const teams = await prisma.team.findMany({
        where: {
          tournamentId: tournament.id,
        },
        include: {
          players: true,
        },
      });

      await prisma.game.createMany({
        data: createGamesNTimes(teams, tournament.id, tournament.rounds),
      });

      return { id: tournament.id };
    }),
});
