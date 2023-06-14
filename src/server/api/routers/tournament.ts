import z from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import createGames from "~/server/api/utils/createGames";
import { NewTournamentSchema } from "~/types/tournament.types";
import createTeams from "~/utils/createTeams";

export const tournamentRouter = createTRPCRouter({
  getAllTournaments: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    const tournaments = await prisma.tournament.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { tournaments };
  }),

  getTournament: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const tournament = await prisma.tournament.findUnique({
        where: {
          id: input.id,
        },
      });

      return { tournament };
    }),

  postNewTournament: protectedProcedure
    .input(NewTournamentSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      // let newTeams = input.teams;

      if (input.kind === "king") {
        const { players, id } = await prisma.tournament.create({
          data: {
            type: input.kind,
            name: input.name,
            sets: input.sets,
            userId: ctx.session.user.id,
            players: {
              create: input.king.players.map((player) => ({
                name: player.name,
              })),
            },
          },
          include: {
            players: true,
          },
        });

        const newTeams = createTeams(players);

        for (let i = 0; i < newTeams.length; i++) {
          const element = newTeams[i];

          if (element) {
            await prisma.team.create({
              data: {
                name: element.name,
                tournamentId: id,
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
            tournamentId: id,
          },
        });

        await prisma.game.createMany({
          data: createGames(teams, id),
        });

        return { id };
      } else {
        const { teams, id } = await prisma.tournament.create({
          data: {
            type: input.kind,
            name: input.name,
            sets: input.sets,
            userId: ctx.session.user.id,
            teams: {
              create: input.teams.map((team) => ({
                name: team.name,
                players: {
                  create: team.players.map((player) => ({
                    name: player.name,
                  })),
                },
              })),
            },
          },
          include: {
            teams: true,
          },
        });

        await prisma.game.createMany({
          data: createGames(teams, id),
        });

        return { id };
      }
    }),
});
