import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import createKingGamesNTimes from "~/server/api/utils/createKingGamesNTimes";
import { PlayerSchema } from "~/types/tournament.types";
import createTeams from "~/utils/createTeams";

export const playerRouter = createTRPCRouter({
  getPlayers: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const players = await prisma.player.findMany({
        where: {
          tournamentId: input.id,
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

      return { players };
    }),

  splitPlayersInGroups: protectedProcedure
    .input(
      z.object({ tournamentId: z.string(), players: z.array(PlayerSchema) })
    )
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

      await prisma.team.deleteMany({
        where: {
          tournamentId: tournament.id,
        },
      });

      // update players
      for (const player of input.players) {
        await prisma.player.update({
          where: {
            id: player.id,
          },
          data: {
            points: 0,
            setsWon: 0,
            gamesWon: 0,
            group: player.group,
          },
        });
      }

      const players = await prisma.player.findMany({
        where: {
          tournamentId: tournament.id,
        },
      });

      const newTeams = createTeams(players);

      for (let i = 0; i < newTeams.length; i++) {
        const element = newTeams[i];

        if (element) {
          await prisma.team.create({
            data: {
              name: element.name,
              group: element.group,
              tournamentId: tournament.id,
              players: {
                connect: element.players.map((player) => ({
                  id: player.id,
                })),
              },
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
        data: createKingGamesNTimes(teams, tournament.id, tournament.rounds),
      });

      return { id: tournament.id };
    }),
});
